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
config.messages.welcomeMessage = "My name is Tommy, your companion.";
config.messages.secondWelcomeMessage = "My job is to help find the right product for you.";
config.messages.messageAfterStartOver = "To start, select from a curated list of categories";
config.messages.emptyTopLevelResponse = "Sorry, something went wrong. Please try again later";
config.messages.emptySubCategoryResponse = "Sorry, we are unable to find any categories";
config.messages.emptyProductResponse = "Sorry, no products found. Please try our other products";

//data
config.data={};
config.data.menu1="5d94ab73f9ea197e645a7fc5/1576238495319-9TG8IEPPEWFVNQ8JOQLP/ke17ZwdGBToddI8pDm48kEpVg-ILAPna1wRh-xAJ9fRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwEv36x-EUL2-BSQ5feDhwGCbXuJBFqZ-erYzVouT8yOb9TwqchglLQOCYTRn7ZGxI/image-asset.jpeg";
config.data.menu2="5d94ab73f9ea197e645a7fc5/1576238495459-HYZ209U8OCDD3414P6HL/ke17ZwdGBToddI8pDm48kEpVg-ILAPna1wRh-xAJ9fRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwEv36x-EUL2-BSQ5feDhwGCbXuJBFqZ-erYzVouT8yOb9TwqchglLQOCYTRn7ZGxI/image-asset.jpeg";
config.data.menu3="5d94ab73f9ea197e645a7fc5/1576238495459-HYZ209U8OCDD3414P6HL/ke17ZwdGBToddI8pDm48kEpVg-ILAPna1wRh-xAJ9fRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwEv36x-EUL2-BSQ5feDhwGCbXuJBFqZ-erYzVouT8yOb9TwqchglLQOCYTRn7ZGxI/image-asset.jpeg";
config.data.menu4="5d94ab73f9ea197e645a7fc5/1575051797739-8L1M17E5JJS88G2HJ0EU/ke17ZwdGBToddI8pDm48kFVLZvLBdE-d1IyYFxRbMCl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UXuMBqnGA4zDIm6XK3pYGveve9-PDnJJ6DxEOe-xmB9IRrZkNvCHU_SL75OklhLncA/Nicmac%2B-%2B28-09-198166.jpg";

//products
config.data.product1="5d94ab73f9ea197e645a7fc5/1571921658382-5L21077PO01E6FUZZOSP/ke17ZwdGBToddI8pDm48kO6t_FIigFZlD-2ukJs68NZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UdQnRCmyfmE32mt8hf8jTbpNOvskeoRv-ygqK_y0NLe3pygZMNSAPtQr-kV0SxGO-A/1.+NICMAC+BEAUTY+BE+NICE+FOUNDATION+BRUSH+-+SYNTHETIC+VEGAN+MAKEUP+BRUSH.jpg?format=1500w";
config.data.product2="5d94ab73f9ea197e645a7fc5/5d94bb33d183af03dd7f5f7c/5db19e5c3bec453f4a90d30a/1574789391687/?format=1000w";
config.data.product3="5d94ab73f9ea197e645a7fc5/5d94bb33d183af03dd7f5f7c/5db19be83bec453f4a90b7d1/1574798885107/?format=1000w";
config.data.product4="5d94ab73f9ea197e645a7fc5/5d94bb33d183af03dd7f5f7c/5db19b023255d740e128aa40/1575227579769/?format=1000w";
config.data.product5="5d94ab73f9ea197e645a7fc5/1575035339283-AL0JPLC0ZLJ0DJPSKYE2/ke17ZwdGBToddI8pDm48kJUlZr2Ql5GtSKWrQpjur5t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UfNdxJhjhuaNor070w_QAc94zjGLGXCa1tSmDVMXf8RUVhMJRmnnhuU1v2M8fLFyJw/I%2BYES.jpg?format=1500w";
config.data.product6="5d94ab73f9ea197e645a7fc5/1575035286722-NINZ1ZWM7AX473PN8QLJ/ke17ZwdGBToddI8pDm48kJUlZr2Ql5GtSKWrQpjur5t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UfNdxJhjhuaNor070w_QAc94zjGLGXCa1tSmDVMXf8RUVhMJRmnnhuU1v2M8fLFyJw/C%2BYES.jpg?format=1500w";
config.data.product7="5d94ab73f9ea197e645a7fc5/1575028502136-YSXEI0U1KQIPOMUVT07M/ke17ZwdGBToddI8pDm48kJUlZr2Ql5GtSKWrQpjur5t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UfNdxJhjhuaNor070w_QAc94zjGLGXCa1tSmDVMXf8RUVhMJRmnnhuU1v2M8fLFyJw/W%2BYES.jpg?format=1500w";
config.data.product8="5d94ab73f9ea197e645a7fc5/1575035238891-UF9JFRUSES9DD41ES7CD/ke17ZwdGBToddI8pDm48kJUlZr2Ql5GtSKWrQpjur5t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UfNdxJhjhuaNor070w_QAc94zjGLGXCa1tSmDVMXf8RUVhMJRmnnhuU1v2M8fLFyJw/K%2BYES.jpg?format=1500w";

module.exports=config;