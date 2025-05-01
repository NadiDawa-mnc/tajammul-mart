const { MONGO_USERNAME, MONGO_PASSWORD } = process.env

export const connectionStr = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.zyr0u3k.mongodb.net/tajammulMart?retryWrites=true&w=majority&appName=Cluster0`
