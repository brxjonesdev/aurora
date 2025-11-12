"use client"

import { useEffect, useMemo, useState } from "react"
import { buildFileTree } from "./utils"
import { useSearchParams } from "next/navigation"
import { useFileSystemStore } from "../../../stores/file-system-provider"
import { ManuscriptDBNode, ManuscriptTreeNode } from "../../../types/manuscript"

export interface UseManuscriptFileSystemResult {
  fileTree: ManuscriptTreeNode[]
  loading: boolean
  error: string | null
  createNode: (parentID: string | null, name: string, type: "file" | "folder") => void
  modifyNode: (nodeID: string, changes: Partial<ManuscriptTreeNode>) => void
  removeNode: (nodeID: string) => void
  cloneNode: (node: ManuscriptTreeNode) => void
  moveNode: (nodeID: string, newParentID: string | null) => void
  selectedNodeID: string | null
  setSelectedNodeID: (nodeID: string | null) => void
  getAllFolders: () => ManuscriptTreeNode[]
}

export const useManuscriptFileSystem = (
  manuscriptID: string,
  nodes: ManuscriptDBNode[] | null,
): UseManuscriptFileSystemResult => {
  const { tree, setTree, addNode, updateNode, deleteNode, duplicateNode } = useFileSystemStore((state) => state)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedNodeID, setSelectedNodeID] = useState<string | null>(null)
  const searchParams = useSearchParams()

  const fileTree = useMemo(() => {
    if (!nodes) return []
    try {
      return buildFileTree(nodes)
    } catch (err) {
      setError("Failed to build file tree.")
      return []
    }
  }, [nodes])

  useEffect(() => {
    if (!nodes) {
      setError("No manuscript data found.")
      setLoading(false)
      return
    }
    const timeout = setTimeout(() => {
      setTree(fileTree)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [fileTree, nodes, setTree])

  const createNode = (parentID: string | null, name: string, type: "file" | "folder") => {
    addNode(parentID, name, type)
  }

  const modifyNode = (nodeID: string, changes: Partial<ManuscriptTreeNode>) => {
    const updatedChanges = { ...changes }

    if (updatedChanges.name) {
      const sanitized = updatedChanges.name.trim()
      updatedChanges.name = sanitized
      updatedChanges.slug = sanitized.toLowerCase().replace(/\s+/g, "-")
    }

    updateNode(nodeID, updatedChanges)

    if (updatedChanges.slug) {
      const newUrl = `/manuscript/${manuscriptID}/${updatedChanges.slug}?${searchParams.toString()}`
      if (window.location.pathname !== newUrl) {
        window.history.replaceState(null, "", newUrl)
      }
    }
  }

  const removeNode = (nodeID: string) => {
    deleteNode(nodeID)
  }

  const cloneNode = (node: ManuscriptTreeNode) => {
    duplicateNode(node)
  }

  const moveNode = (nodeID: string, newParentID: string | null) => {
    const findNode = (nodes: ManuscriptTreeNode[], id: string): ManuscriptTreeNode | null => {
      for (const node of nodes) {
        if (node.id === id) return node
        if (node.children.length > 0) {
          const found = findNode(node.children, id)
          if (found) return found
        }
      }
      return null
    }

    const removeFromTree = (nodes: ManuscriptTreeNode[], id: string): ManuscriptTreeNode[] => {
      return nodes
        .filter((node) => node.id !== id)
        .map((node) => ({
          ...node,
          children: removeFromTree(node.children, id),
        }))
    }

    const addToParent = (
      nodes: ManuscriptTreeNode[],
      parentID: string | null,
      nodeToAdd: ManuscriptTreeNode,
    ): ManuscriptTreeNode[] => {
      if (parentID === null) {
        return [...nodes, nodeToAdd]
      }
      return nodes.map((node) => {
        if (node.id === parentID) {
          return {
            ...node,
            children: [...node.children, nodeToAdd],
          }
        }
        return {
          ...node,
          children: addToParent(node.children, parentID, nodeToAdd),
        }
      })
    }

    const nodeToMove = findNode(tree, nodeID)
    if (!nodeToMove) return

    const isDescendant = (parentNode: ManuscriptTreeNode, childId: string): boolean => {
      if (parentNode.id === childId) return true
      return parentNode.children.some((child) => isDescendant(child, childId))
    }

    if (newParentID) {
      const targetParent = findNode(tree, newParentID)
      if (targetParent && isDescendant(nodeToMove, newParentID)) {
        console.warn("Cannot move a folder into itself or its descendants")
        return
      }
    }

    const treeWithoutNode = removeFromTree(tree, nodeID)
    const newTree = addToParent(treeWithoutNode, newParentID, nodeToMove)
    setTree(newTree)
  }

  const getAllFolders = (): ManuscriptTreeNode[] => {
    const folders: ManuscriptTreeNode[] = []
    const traverse = (nodes: ManuscriptTreeNode[]) => {
      nodes.forEach((node) => {
        if (node.type === "folder") {
          folders.push(node)
          if (node.children.length > 0) {
            traverse(node.children)
          }
        }
      })
    }
    traverse(tree)
    return folders
  }

  return {
    fileTree: tree,
    loading,
    error,
    createNode,
    modifyNode,
    removeNode,
    cloneNode,
    moveNode,
    selectedNodeID,
    setSelectedNodeID,
    getAllFolders,
  }
}
