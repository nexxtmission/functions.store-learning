### How this function works

A welcome email is one of the first impressions your brand makes. It sets the foundation for the kind of cooperation you will have with your subscribers. The sendSignUpWelcomeEmail function will allow you to send a welcome email when users sign up via a SendGrid template.

### Prerequisites
* You must have previous knowledge of **SendGrid**.
* You must have previous knowledge of **Firebase**.

### Function details

Follow this step-by-step guide to create and send a welcome email automatically with sendSignUpWelcomeEmail function.

##### Step 1: Create an account in SendGrid

If you already use the SendGrid services, you should already be logged in and can skip this step. If you don't, you should create an account to sign in to SendGrid:

* Go to [https://sendgrid.com/](https://sendgrid.com/) and create an account.
* Sign in and continue with the process.

##### Step 2: Define a Sender and a Dynamic Template for your email

Before sending any email, you will need to create a sender identity. It’s required that you provide the identity information about where the emails are coming from in each email you send.

Then select the template you want to use for your email from a blank template, a custom template that you have already created, or a predefined SendGrid Email Design. Note that the SendGrid template might receive the following variables depending on the provider used to signUp:
   * provider: The providerId used for signUp (google.com, facebook.com, phone, password, etc.).
   * displayName: The name of the new user created. It will be received if it's available from the provider.
   * phoneNumber: The user phone number. It will be received if it's available from the provider.
   * photoURL: The URL of the new user created. It will be received if it's available from the provider.

These variables can be used in the template as follow:
```html
<p>Welcome to my company, dear {{displayName}}</p>
```

> Note that in case the email can not be resolved the welcome email will not be sent.

##### Step 3: Install the sendSignUpWelcomeEmail function

Now that you have all the configuration options in SendGrid, go to our Marketplace and click *Install* to install the `sendSignUpWelcomeEmail` function.

In order to complete the installation process, you must add the required info to the form with the following parameters from your SendGrid account:
  * **SENDGRID_API_KEY:** The API key to authenticate access to SendGrid services.
  * **SENDGRID_SENDER_EMAIL:** Email corresponding to SendGrid sender correctly verified.
  * **SENDGRID_TEMPLATE_ID:** The ID of SendGrid dynamic template that will be used to generate the welcome email.

Proceed to click *Install*, and in a few seconds, you will see the function appear in the Installed section.

Now the sendSignUpWelcomeEmail function is installed into your project and you can programmatically send welcome emails to all users who will be signing up for your project.

### Resources
For more information about SendGrid, see:
+ [SendGrid Support](https://support.sendgrid.com/hc/en-us)
+ [SendGrid Sending email](https://sendgrid.com/docs/ui/sending-email/)
