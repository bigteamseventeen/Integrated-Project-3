import * as $ from 'jquery';
import { FeatureCollection } from 'geojson';

/**
 * The level of earthquakes being polled
 */
export enum EQSignificance {
    /** All Earthquakes */
    ALL = 0,

    /** Significant Earthquakes */    
    SIGNIFICANT = 1,
    
    /** Magnitude 4.5 + */
    M4_5_PLUS = 2,
    
    /** Magnitude 2.5 + */
    M2_5_PLUS = 3, 
    
    /** Magnitude 1 + */
    M1_0_PLUS = 4, 
}

/**
 * Date span of the earthquakes
 */
export enum EQDateSpan {
    Hour  = "hour",
    Day   = "day",
    Week  = "week",
    Month = "month"
}
                      // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson
export const URL_BASE = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/";
export const URLS = {
    [EQSignificance.ALL]:         URL_BASE + "all",
    [EQSignificance.M1_0_PLUS]:   URL_BASE + "1.0",
    [EQSignificance.M2_5_PLUS]:   URL_BASE + "2.5",
    [EQSignificance.M4_5_PLUS]:   URL_BASE + "4.5",
    [EQSignificance.SIGNIFICANT]: URL_BASE + "significant",
};


export function GetEarthQuakes(Span: EQDateSpan, Significance: EQSignificance, callback: (features: FeatureCollection, status) => void): void {
    // console.log("GetEarthQuakes: ", Span, Significance, callback);
    $.ajax({
        type: "GET",
        url: `${this.URLS[Significance]}_${Span}.geojson`,
        data: {},
        success: callback,
        dataType: 'json',
    });
}