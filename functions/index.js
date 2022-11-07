const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  const keyName = data.env === "PROD" ? "secret_key_prod" : "secret_key_test";
  const secretKey = functions.config().stripe[keyName];
  const stripe = require("stripe")(secretKey);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "https://internetexploring.io/play/puzzles",
    cancel_url: "https://internetexploring.io",
    line_items: [{
      quantity: 1,
      price_data: {
        currency: "usd",
        // 299$ - DEPLOY AFTER CHANGE - firebase deploy --only functions
        unit_amount: 299,
        product_data: {
          name: "Internet Exploring",
          description: "What if the Internet was your escape room?",
        },
      },
    }],
    metadata: {userId: data.userId},
  });

  return session;
});

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const keyName = "secret_key_test";
  const secretKey = functions.config().stripe[keyName];
  const stripe = require("stripe")(secretKey);

  let event;
  try {
    const whSecret = functions.config().stripe.payments_webhook_secret;

    event = stripe.webhooks.constructEvent(
        req.rawBody, req.headers["stripe-signature"], whSecret,
    );
  } catch (error) {
    console.error("Webhook signature verification failed");
    return res.sendStatus(400);
  }

  const dataObject = event.data.object;
  await admin.firestore().collection("customers")
      .doc(dataObject.metadata.userId).set({
        checkoutSessionId: dataObject.id,
        paymentStatus: dataObject.payment_status,
        amountTotal: dataObject.amount_total,
        email: dataObject.customer_details.email,
        name: dataObject.customer_details.name,
      });
  return res.sendStatus(200);
});


