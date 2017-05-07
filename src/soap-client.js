import soap from 'soap-as-promised'

export default async advcashSoapUrl => {
    const soapClient = await soap.createClient(advcashSoapUrl, {
        endpoint: advcashSoapUrl,
        ignoredNamespaces: {
            namespaces: [],
            override: true
        }
    })

    return async (operation, args, map) => {
        const response = await soapClient[operation].call(this, args)
        return map ? map(response.return) : response.return
    }
}