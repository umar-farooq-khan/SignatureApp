url = "https://umar-farooq-khan.github.io/SignatureApp/"
import qrcode
# Create a QR code object
qr = qrcode.QRCode(
    version=1,  # controls the size of the QR Code
    error_correction=qrcode.constants.ERROR_CORRECT_L,  # controls the error correction used for the QR Code
    box_size=10,  # controls how many pixels each “box” of the QR code is
    border=4,  # controls how many boxes thick the border should be
)

# Add the URL to the QR code
qr.add_data(url)
qr.make(fit=True)

# Create an image from the QR Code instance
img = qr.make_image(fill_color="black", back_color="white")

# Save the image file
img.save("qrcode.png")

print("QR code generated and saved as 'qrcode.png'")