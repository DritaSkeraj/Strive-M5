const express = require("express");
const { parseString } = require("xml2js");
const publicIp = require("public-ip");
const axios = require("axios");
const { promisify } = require("util");
const { begin } = require("xmlbuilder");

const xmlRouter = express.Router();
const asyncParser = promisify(parseString);

xmlRouter.get("/", async (req, res, next) => {
  try {
    const { ip } = await publicIp.v4();
    const response = await axios.get(
      `http://www.geoplugin.net/xml.gp?ip=${ip}`
    );
    const xml = response.data;

    const parsedJS = await asyncParser(xml);
    res.send({
      latitude: parsedJS.geoPlugin.geoplugin_latitude,
      longitude: parsedJS.geoPlugin.geoplugin_longitude,
    });
  } catch (error) {
    next(error);
  }
});

xmlRouter.get("/lowerCase", async (req, res, next) => {
  try {
    const { string, token } = req.query;

    const xmlBody = begin()
      .ele("soap:Envelope", {
        "xmlns:soap": "http://schemas.xmlsoap.org/soap/envelope/",
      })
      .ele("soap:Body")
      .ele("AllLowercaseWithToken", {
        xmlns: "http://www.dataaccess.com/webservicesserver/",
      })
      .ele("sAString")
      .text(string)
      .up()
      .ele("sToken")
      .text(token)
      .end();

    const response = await axios({
      method: "post",
      url:
        "https://www.dataaccess.com/webservicesserver/TextCasing.wso?op=AllLowercaseWithToken",
      data: xmlBody,
      headers: { "Content-type": "text/xml" },
    });
    const xml = response.data;
    const parsedJS = await asyncParser(xml);
    res.send(
      parsedJS["soap:Envelope"]["soap:Body"][0][
        "m:AllLowercaseWithTokenResponse"
      ][0]["m:AllLowercaseWithTokenResult"][0]
    );
  } catch (error) {
    next(error);
  }
});

module.exports = xmlRouter;
