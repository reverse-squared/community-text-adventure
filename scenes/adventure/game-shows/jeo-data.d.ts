// Intellisense Type Data for jeo-data.jsx
import { Text } from 'web-text-adventure/src/adventure';

interface JeopardyCatagory {
    catagoryName: string;
    questions: Array<JeopardyQuestion>
}
interface JeopardyQuestion {
    question: () => Text,
    options: Array<{
        text: Text;
    }>;
    contributor: string;
}

type JeopardyGameData = Array<JeopardyCatagory>;

const data: JeopardyGameData;
export default data;