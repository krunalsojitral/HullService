const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "6e0ddf786c5bcac05cd365cca012801a-us14",
  server: "us14",
});

var aud_Id = "077fc4deaa";

const sendmail = () => {
  const footerContactInfo = {
    company: "qcodes",
    address1: "pernambut",
    city: "vellore",
    state: "tamilnade",
    zip: "635810",
    country: "india",
  };

  const campaignDefaults = {
    from_name: "duraibabu",
    from_email: "durai@qcodesinfotech.com",
    subject: "eventLink",
    language: "english",
  };
  async function createAudience() {
    try {
      const audience = await mailchimp.lists.createList({
        name: "durai",
        contact: footerContactInfo,
        email_type_option: true,
        campaign_defaults: campaignDefaults,
      });
      console.log(audience);
    } catch (err) {}
  }
  createAudience();
};

async function getInformations() {
  const response = await mailchimp.lists.getAllLists();
  console.log(response);
}

// getInformations();
const addMembers = async (data) => {
  const response = await mailchimp.lists.addListMember(aud_Id, {
    email_address: data.email,
    status: "subscribed",
  });
  console.log(response);
};

module.exports = {
  sendmail,
  getInformations,
  addMembers,
};
