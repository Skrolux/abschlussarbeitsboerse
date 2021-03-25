export class Entry {
    author: string;
    title: string;
    description: string;
    type: string;
    faculty: string;
    institute: string;
    payment: boolean;
    employment: boolean;
    industryPartner: {
        name: string,
        website: string,
        text: string
    }
    tags: string[];
    languages: string;
    suitableStudies: string[];
    publishedDate: string;
    lastEditedDate: string;
    contact1: string;
    contact2: string;
    contact3: string;
    contact4: string;
    contact5: string;
    visible: boolean;
    assigned: boolean;
    specialField: string;
    availableAsOfDate: string;
}