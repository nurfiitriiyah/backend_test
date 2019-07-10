var unirest = require('unirest');

async function getAllData() {
    var hitAPi = unirest.get('https://web.facebook.com/papite.pite?fields=id,name&access_token=EAAgUCBXefNMBAKxieOkcWAgJm0gquDnDGRuiL2lEmI8GvtdChX7mRaZAhBLpvRZCeo4XPNOZApYm1L5bVxYuCM9Q51aIi2qzm2bJhZBZCk0rzoCN87wlfBFZCPQZCZBgGe1utC2ayIcVNFmd9Rz4h4ylbZCqQMBK8RZBhVxRnMUEOGzFCrG4DSKBKPcpPCO47QwGgFMCKZAAIZBICADrtxx5g0ua').end().exac()
        // .end(function (response) {
        //     return response.body
        // });
    console.log(await hitAPi.body)
}

module.exports = {
    getAllData
}