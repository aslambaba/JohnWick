// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const stripe = require('stripe')('sk_test_51Hwv4MJxGPfhLM6wzX1WI41aQS0SEJsONqemgX9dvJi2zW73xSHCmtbagFIfkoGfUkLr6oprYFe2VaR8mqAzcKqs00N49njrRs');
const handler = async (event) => {
  const data = event.body;
  console.log(data);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(data),
      currency: 'usd',
      // Verify your integration in this guide by including this parameter
      metadata: { integration_check: 'accept_a_payment' },
    });
    return {
      statusCode: 200,
      body: JSON.stringify({client_secret: paymentIntent.client_secret}),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
