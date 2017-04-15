import soap from 'soap-as-promised'

export default advcashSoapUrl => {
    return soap.createClient(advcashSoapUrl, {
        endpoint: advcashSoapUrl,
        ignoredNamespaces: {
            namespaces: [],
            override: true
        }
    })
}