import { db, app } from "../utils/firebase/Firebase";

function useDataFetch() {
    const getProfileData = async () => {
        const uid = app.auth().currentUser.uid;
        const doc = await db.collection('user').doc(uid).get();
        return doc.data();
    };
    return {
        getProfileData,
    };
};

export default useDataFetch