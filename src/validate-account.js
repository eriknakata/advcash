export default (validateAccountResponse) => {
    return {
        firstNameMatchingPercentage: parseFloat(validateAccountResponse.firstNameMatchingPercentage),
        lastNameMatchingPercentage: parseFloat(validateAccountResponse.lastNameMatchingPercentage)
    }
}