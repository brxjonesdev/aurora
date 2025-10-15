export interface OnboardingService {
  checkOnboardingStatus: (userId: string) => Promise<{ isOnboarded: boolean }>;
}

export const OnboardingService: OnboardingService = {
  async checkOnboardingStatus(userId: string): Promise<{ isOnboarded: boolean }> {
    // Simulate an API call to check onboarding status
    return { isOnboarded: true }; // Replace with actual API call
  },
};
