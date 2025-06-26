// API service for communicating with the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003'; // Backend server URL from environment

// Common fetch options for all API calls
const commonFetchOptions = {
  credentials: 'include' as RequestCredentials,
  headers: {
    'Accept': 'application/json',
  }
};

export interface AnalysisResult {
  metadata: {
    gender: string;
    body_type: string;
    skin_color: string;
  };
  success: boolean;
  message: string;
}

export interface HeadSwapResult {
  output_image: string;
  analysis: AnalysisResult;
  pregenerated_image_url: string;
}

export class ApiService {
  // Analyze user image to determine body type and skin color
  static async analyzeUserImage(imageFile: File): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE_URL}/api/analyze-user-image`, {
      method: 'POST',
      body: formData,
      ...commonFetchOptions
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Analysis failed: ${errorText}`);
    }

    return response.json();
  }

  // Perform head swap with user image and reference image
  static async swapHead(imageFile: File, referenceImage?: string): Promise<HeadSwapResult> {
    console.log('ApiService.swapHead called');
    console.log('imageFile:', imageFile);
    console.log('referenceImage:', referenceImage);
    
    const formData = new FormData();
    formData.append('image', imageFile);
    
    if (referenceImage) {
      formData.append('reference_image', referenceImage);
    }

    console.log('Making request to:', `${API_BASE_URL}/api/swap-head`);
    const response = await fetch(`${API_BASE_URL}/api/swap-head`, {
      method: 'POST',
      body: formData,
      ...commonFetchOptions
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`Head swap failed: ${errorText}`);
    }

    const result = await response.json();
    console.log('API success response:', result);
    return result;
  }

  // Get the URL for a reference image based on body type and skin color
  static getReferenceImageUrl(bodyType: string, skinColor: string, colorPrefix: string = 'arcticfox'): string {
    return `${API_BASE_URL}/images/bodytypes/headswapper/${bodyType}/${colorPrefix}_headswapper_${bodyType}_${skinColor}_directfull.png`;
  }
} 