module.exports = {
    trimUserInfo(userObject) {
        return {
            "access_token": userObject["access_token"],
            "email": userObject.email,
            "id": userObject._id,
            "profileImage": userObject.profileImage,
            "firstName": userObject.firstName,
            "lastName": userObject.lastName,
            "gender": userObject.gender,
            "dateOfBirth": userObject.dateOfBirth
        }
    }
}