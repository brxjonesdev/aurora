"use client";
import { useState } from "react";

export default function useManuscriptSidebar({manuscriptID}: {manuscriptID: string}) {
    const [error, setError] = useState<string | null>(null);
    const addNewFolder = (parentNodeID: string | null, name: string) => {

    }

    const addNewFile = (parentNodeID: string | null, name: string, content?: string) => {

    }

    const moveNode = (nodeID: string, newParentID: string | null) => {}
    const renameNode = (nodeID: string, newName: string) => {}
    const deleteNode = (nodeID: string) => {}
    const duplicateNode = (nodeID: string, targetParentID: string | null) => {}
    const updateNodeLabels = (nodeID: string, labels: string[]) => {}
    const updateNodeStatus = (nodeID: string, status: string | null) => {}

    return {
        addNewFolder,
        addNewFile,
        moveNode,
        renameNode,
        deleteNode,
        duplicateNode,
        updateNodeLabels,
        updateNodeStatus,

        error,
    };
    };