import "dotenv/config";

import amqp from "amqplib";

export const publishNotification = async (success, error) => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();

        const exchangeName = "update_items";
        const message = { success, error };

        await channel.assertExchange(exchangeName, "fanout", { durable: true });

        channel.publish(exchangeName, "", Buffer.from(JSON.stringify(message)));

        console.log(`[Publisher] Broadcasted event:`, message);

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error("Publisher error:", error);
    }
};
