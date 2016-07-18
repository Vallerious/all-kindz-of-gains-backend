module.exports = {
    trimUserInfo(userObject) {
        return {
            "access_token": userObject["access_token"],
            "email": userObject.email,
            "id": userObject._id,
            "images": userObject.images,
            "firstName": userObject.firstName,
            "lastName": userObject.lastName
        }
    }
}