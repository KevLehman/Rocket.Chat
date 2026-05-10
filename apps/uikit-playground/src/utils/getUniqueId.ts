const getUniqueId = () => crypto.randomUUID().slice(0, 8);

export default getUniqueId;
