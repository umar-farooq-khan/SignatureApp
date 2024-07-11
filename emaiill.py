import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import msal
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import base64

# Azure AD application details
client_id = 'nda@clearip.ai'
client_secret = "Whatsappnigga93909390"
tenant_id = '9e30cc23-5d3e-4dca-80f8-981bd53e215b'
authority = f'https://login.microsoftonline.com/{tenant_id}'
scopes = ['https://outlook.office365.com/.default']

# Create a confidential client application
app = msal.ConfidentialClientApplication(client_id, authority=authority, client_credential=client_secret)

# Acquire a token for the scopes
result = app.acquire_token_for_client(scopes=scopes)
print(result)
access_token = result['access_token']
# Email configuration
sender_email = "nondisclosure@clearip.ai"
receiver_email = "umarkhan2840503@gmail.com"
password = "Whatsappnigga93909390"

# Create the email headers
msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = receiver_email
msg['Subject'] = "meeting in 10 minutesl"

# Email body
body = "TMetting will be started in 10minutes."
msg.attach(MIMEText(body, 'plain'))

# Create SMTP session
try:
    # Create SMTP session
    server = smtplib.SMTP('smtp.office365.com', 587)
    server.starttls()

    # Login to the email account using OAuth2
    auth_string = 'user=%s\1auth=Bearer %s\1\1' % (sender_email, access_token)
    server.docmd('AUTH', 'XOAUTH2 ' + base64.b64encode(auth_string.encode()).decode())

    # Send email
    server.sendmail(sender_email, receiver_email, msg.as_string())
    print("Email sent successfully!")

except Exception as e:
    print(f"Failed to send email. Error: {e}")

finally:
    # Terminate the SMTP session
    server.quit()
