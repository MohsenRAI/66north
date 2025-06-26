# image_gen/prompts.py

"""
Prompt templates for image generation.
"""

# Base template for body generation
BODY_GENERATION_TEMPLATE = """Create a full-body professional fashion photo of a male model with a {body_type} body type: {description}.

⚠️ CRITICAL FRAMING REQUIREMENTS - MUST FOLLOW EXACTLY:
- Divide the frame into a 3x3 grid
- Subject's head MUST be centered in the middle square of the top row
- There MUST be a FULL empty grid square (33% of frame height) above the head
- Subject's full body should occupy the middle column of squares
- Feet should rest in the bottom third, well above bottom edge

CAMERA SETUP AND POSITION:
- Camera at chest height (about 4.5 feet / 137cm from ground)
- Tilt up 5-10 degrees to create natural headroom
- Distance: far enough to show full body with 33% margin above head
- Focal length: 85mm equivalent (to avoid distortion)
- Portrait orientation (4:5 ratio)

⚠️ COMPOSITION RULES:
- Head MUST be in middle square of top row, never higher
- Eyes should align with the bottom third of the top grid square
- Shoulders should align with the top third of the middle grid square
- Full body must fit within middle column with margins
- Minimum 10% margin on left and right sides

POSE SELECTION - IMPORTANT:
Based on the body type name "{body_type}", you must randomly select ONE pose from the following list.
DO NOT default to the first pose or a tie-adjusting pose.
Each body type should have a different pose to create variety.

{pose_options}

IMPORTANT: You MUST choose a different pose for this body type ({body_type}) than what was used for other body types.
DO NOT default to a tie-adjusting pose.

BACKGROUND AND LIGHTING:
- Use the background specified in the pose description
- Professional lighting with dramatic shadows on subject  
- Rim light to highlight figure
- Even lighting across the frame that complements the background setting

CLOTHING:
- Beige quarter-zip pullover sweater (NOT a shirt) made of lightweight, heathered technical fabric
- MUST be a pullover style with a quarter-length zipper at the neck
- NO buttons or full-length zipper
- Fitted silhouette with long sleeves and high collar
- Short front zipper (quarter-length) with clean finish
- Small tonal chest logo on the left
- Paired with black winter trousers (slim-fit, technical or wool)
- Optional gloves or scarf depending on pose, but no bulky coats

⚠️ CRITICAL GARMENT REQUIREMENTS:
- MUST be a quarter-zip pullover sweater, NOT a shirt
- MUST have a quarter-length zipper at the neck
- NO buttons or full-length zipper
- MUST be a pullover style, not a button-up or full-zip style

TECHNICAL SPECIFICATIONS:
- 8k quality
- Hyperrealistic
- Photorealistic
- Sharp focus throughout
- No motion blur

⚠️ FINAL CHECKS - MUST VERIFY ALL: 
1. HEAD POSITION:
   - Head MUST be in middle square of top row
   - Full empty grid square (33%) above head
   - No part of head/hair touches top third of frame

2. BODY FRAMING:
   - Full body visible with consistent margins
   - Subject centered in middle column
   - No cropping of any body parts

3. POSE AND STYLE:
   - Verify pose is NOT a tie-adjusting pose
   - Ensure pose differs from previous generations
   - Face clearly visible to camera

4. TECHNICAL:
   - Background matches the pose description setting
   - Sharp focus throughout
   - Professional lighting

⚠️ CRITICAL: If ANY of these checks fail, the image must be regenerated."""

# Template for applying outfit
OUTFIT_APPLICATION_TEMPLATE = """Create a photorealistic image of the man wearing the complete outfit from the reference photo.
Maintain the exact same pose and facial features of the base image.
Keep the professional studio lighting and add proper lighting and SHADOWS to the image to make it look realistic"""

# Template for pose category options
POSE_CATEGORY_TEMPLATE = """Professional Standing Poses (select if random number 1-3):
- Standing tall with hands at sides, professional stance, clear face visible
- One hand casually in pocket, other at side, confident pose, direct gaze
- Hands clasped in front, professional stance, engaging camera directly
- One hand in pocket, other hand at collar, strong presence, clear face
- Standing straight, both hands adjusting shirt, face to camera
- One hand adjusting collar, other at side, direct eye contact
- Standing with hands behind back, confident posture, face forward
- Both hands adjusting cuffs, commanding presence, clear facial features

Dynamic Standing Poses (select if random number 4-6):
- Both hands at sides, shoulders back, power stance, direct gaze
- One hand adjusting watch, other at side, looking at camera
- Hands at hips, confident executive pose, face clearly visible
- Standing with subtle contrapposto, one hand at shirt button, face forward
- One hand adjusting collar, other relaxed, direct eye contact
- Both hands subtly adjusting cuffs, face to camera
- Standing with one hand smoothing shirt, clear facial features
- Classic male model pose, hands framing torso, face forward
- Power pose with hands positioned naturally, engaging camera

Editorial Poses (select if random number 7-9):
- Looking directly at camera, one hand at chin, full face visible
- Strong stance with subtle head tilt, engaging eyes to camera
- One hand adjusting collar, direct camera engagement
- Modern power pose, hands framing torso, face forward
- Classic fashion stance, hands at natural position, clear face
- Contemporary pose with hands at sides, strong camera presence
- Bold stance with hands positioned naturally, direct gaze
- Fashion-forward pose, adjusting sleeve, face to camera
- Confident pose with hands subtly positioned, clear facial features
- Strong editorial stance, engaging directly with camera"""

ARCTICFOX_BODY_GENERATION_TEMPLATE = """
Create a full-body professional fashion photo of a male model with the specified body type and description.

CRITICAL FRAMING REQUIREMENTS - MUST FOLLOW EXACTLY:
- OUTPUT MUST BE A FULL BODY IMAGE showing the COMPLETE model from HEAD (including ALL HAIR) to TOE (including COMPLETE SHOES)
- The model's entire head, hair, and face MUST be completely visible and clear
- Divide the frame into a 3x3 grid
- Subject's head MUST be centered in the middle square of the top row
- There MUST be a FULL empty grid square (33% of frame height) above the head
- Subject's full body should occupy the middle column of squares
- Feet should rest in the bottom third, well above bottom edge

CAMERA SETUP AND POSITION:
- Camera at chest height (about 4.5 feet / 137cm from ground)
- Tilt up 5-10 degrees to create natural headroom
- Distance: far enough to show full body with 33% margin above head
- Focal length: 85mm equivalent (to avoid distortion)
- Portrait orientation (4:5 ratio)

POSE SELECTION:
- IMPORTANT: Use the specific pose instructions provided below in the prompt
- Do not default to generic poses
- Follow the pose description exactly as specified
- Maintain natural and realistic body positioning
- Poses should be appropriate for a winter outdoor fashion setting (e.g., leaning against a wooden ski resort fence, standing in front of a chalet, walking in snow, etc.)
- Face must be oriented toward the camera with a confident, professional expression

BACKGROUND AND LIGHTING:
- Outdoor winter setting with snow-covered ground and trees, bright diffused daylight
- Background should include a ski chalet, wooden fence, or alpine scenery
- Add proper lighting and SHADOWS to the image to make it look realistic using the background setting from the pose description
- Professional fashion photography lighting

CLOTHING:
- Beige quarter-zip pullover sweater (main garment)
- Garment must be UNTUCKED and hang naturally outside pants
- Exact color and texture of the sweater must be preserved
- No additional clothing items unless specified

TECHNICAL SPECIFICATIONS:
- 8k quality
- Hyperrealistic
- Photorealistic
- Sharp focus throughout
- No motion blur
- Snow textures must be rendered clearly
- Subject must stand out against the winter background

FINAL CHECKS - MUST VERIFY ALL:
1. HEAD POSITION:
   - Head MUST be in middle square of top row
   - Full empty grid square (33%) above head
   - No part of head/hair touches top third of frame
2. BODY FRAMING:
   - Full body visible with consistent margins
   - Subject centered in middle column
   - No cropping of any body parts
3. POSE AND STYLE:
   - Pose matches the specific instructions provided
   - Face clearly visible to camera
   - Proper professional clothing
4. TECHNICAL:
   - Sharp focus throughout
   - Professional lighting
   - Snow and winter setting are clear
CRITICAL: If ANY of these checks fail, the image must be regenerated.
"""

HEATHER_BODY_GENERATION_TEMPLATE = ARCTICFOX_BODY_GENERATION_TEMPLATE
BLACK_BODY_GENERATION_TEMPLATE = ARCTICFOX_BODY_GENERATION_TEMPLATE

def get_body_generation_prompt(body_type, description):
    """
    Generate a body generation prompt.

    Args:
        body_type (str): Type of body
        description (str): Description of the body type

    Returns:
        str: Formatted prompt
    """
    return BODY_GENERATION_TEMPLATE.format(
        body_type=body_type,
        description=description,
        pose_options=POSE_CATEGORY_TEMPLATE,
    )


def get_outfit_application_prompt():
    """
    Get the outfit application prompt.

    Returns:
        str: Prompt for applying outfit
    """
    return OUTFIT_APPLICATION_TEMPLATE

def get_arcticfox_body_generation_prompt(body_type, description):
    return ARCTICFOX_BODY_GENERATION_TEMPLATE.format(
        body_type=body_type,
        description=description,
    )

def get_heather_body_generation_prompt(body_type, description):
    """Get the prompt for generating a body image with the Heather Grey template."""
    return HEATHER_BODY_GENERATION_TEMPLATE.format(
        body_type=body_type,
        description=description
    )

def get_black_body_generation_prompt(body_type, description):
    """Get the prompt for generating a body image with the Black template."""
    return BLACK_BODY_GENERATION_TEMPLATE.format(
        body_type=body_type,
        description=description
    )
