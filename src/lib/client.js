import  SanityClient  from "@sanity/client";

const client = SanityClient({
projectId: "l7cyvtrs",
dataset: "production" ,
apiVersion: "2022-12-01",
useCdn: true
})

export default client;