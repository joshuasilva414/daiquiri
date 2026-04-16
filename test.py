import cv2
import face_recognition
import face_recognition_models

video_capture = cv2.VideoCapture(0)


def test_camera():
    # Capture a frame from the camera
    ret, frame = video_capture.read()

    if not ret:
        print("Failed to capture frame")
        return

    # Display the frame in a window
    cv2.imshow("Camera Test", frame)

    # Wait for a key press to close the window
    cv2.waitKey(0)
    cv2.destroyAllWindows()
