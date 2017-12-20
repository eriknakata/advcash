import soap from 'soap-as-promised'
import dateformat from 'dateformat'

export default async advcashSoapUrl => {
    const soapClient = await soap.createClient(advcashSoapUrl, {
        endpoint: advcashSoapUrl,
        ignoredNamespaces: {
            namespaces: [],
            override: true
        }
    })

    return async (operation, args, map) => {
        for (let arg in args) {
            if (args.hasOwnProperty(arg)) {
                if (args[arg] instanceof Date) {
                    args[arg] = dateformat(args[arg], 'yyyy-MM-dd') + '\'T\'' + dateformat(args[arg], 'HH:mm:ss');
                }
            }
        }

        const response = await soapClient[operation].call(this, args)
        return map ? map(response.return) : response.return
    }
}