export interface IPO {
    subGroup: string;
    companyName: string;
    shareTypeName: string;
    shareGroupName: string;
    issueOpenDate: string;
    issueCloseDate: string;
}

export interface IPOResponse {
    object: IPO[];
    totalCount: number;
}

export interface CompanyShare {
    id: number;
    name: string;
    scrip: string;
    isFileUploaded: boolean;
}

export interface IPOResultResponse {
    success: boolean;
    message: string;
    body: {
        companyShareList: CompanyShare[];
    };
}