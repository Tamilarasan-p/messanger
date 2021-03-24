'use strict';

var config = {};
// Messages
config.messages = {};

config.messages.authSuccess = "Authentication successful";
config.messages.phoneNoRequest = "Please provide your contact number with 0 prefixed";
config.messages.emailNotRecognised = "Sorry we did not recognise your Email Address, please retry entering your Email Address";
config.messages.requestAddress = "Please provide your delivery address in following format - House Number, Street, City/County, Postcode";
config.messages.unrecognisedPhoneNo = "Sorry we did not recognise your Phone Number, please retry entering again with 0 prefixed";
config.messages.sendReceipt = "Thanks for sharing your address, You will be sent with Order Receipt";
config.messages.unrecognisedAddress = "Sorry we did not recognize your address, Please provide your delivery address in following format - House Number, Street, City/County, Postcode";
config.messages.messageAttachment = "Message with attachment received";
config.messages.requestEmail = "Please provide us your Email Address";
config.messages.unhandledMessage = "Sorry something went wrong, please Start Over or Call us";
config.messages.welcomeMessage = "Hello, my name is Tommy, your companion.";
config.messages.secondWelcomeMessage = "My job is to help find the right product for you.";
config.messages.messageAfterStartOver = "To start, select from a curated list of categories";
config.messages.emptyTopLevelResponse = "Sorry, something went wrong. Please try again later";
config.messages.emptySubCategoryResponse = "Sorry, we are unable to find any categories";
config.messages.emptyProductResponse = "Sorry, no products found. Please try our other products";

module.exports=config;