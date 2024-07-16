export interface IMarketData {
    TYPE: string;
    MARKET: string;
    FROMSYMBOL: string;
    TOSYMBOL: string;
    FLAGS: number;
    LASTTRADEID: string;
    LASTUPDATE: number;
    LASTVOLUME: number;
    LASTVOLUMETO: number;
    VOLUMEHOUR: number;
    VOLUMEHOURTO: number;
    VOLUMEDAY: number;
    VOLUMEDAYTO: number;
    VOLUME24HOUR: number;
    VOLUME24HOURTO: number;
}