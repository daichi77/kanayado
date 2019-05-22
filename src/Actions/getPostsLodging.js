import { DOMParser } from 'xmldom';
import 'date-utils';
import { API_KEY } from 'react-native-dotenv';

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
const getPostsRequest = () => {
  return {
    type: GET_POSTS_REQUEST,
  };
};

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const getPostsSuccess = (data) => {
  return {
    type: GET_POSTS_SUCCESS,
    postslodging: data,
    receivedAt: Date.now(),
  };
};

/* export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';
const getPostsFailure = (error) => {
  return {
    type: GET_POSTS_FAILURE,
    error,
  };
}; */

let hotelsData = [];
let vacancysData = [];
let lodgingSpotData = [];
let data = [];
let start1 = 1;
let start2 = 1;
const jalanKey = API_KEY;
let timeData = 20190526;

lodgingSpot = (url, dispatch) => {
  const hotelData = [];
  const parser = new DOMParser();
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState !== 4) {
      return;
    }

    if (request.readyState === 4) {
      if (request.status === 200) {
        const sMyString = request.responseText;
        const dom = parser.parseFromString(sMyString, 'text/xml');
        const hotels = dom.getElementsByTagName('Hotel');

        for (let i = 0; i < hotels.length; i += 1) {
          let pictureURL = '';
          const hotelId = hotels[i].getElementsByTagName('HotelID')[0].textContent;
          const hotelName = hotels[i].getElementsByTagName('HotelName')[0].textContent;
          const hotelAddress = hotels[i].getElementsByTagName('HotelAddress')[0].textContent;
          const hotelURL = hotels[i].getElementsByTagName('HotelDetailURL')[0].textContent;
          const planSampleRateFrom = hotels[i].getElementsByTagName('SampleRateFrom')[0].textContent;
          const hotelReview = hotels[i].getElementsByTagName('Rating')[0].textContent;
          if (hotels[i].getElementsByTagName('PictureURL')[0] !== undefined) {
            pictureURL = hotels[i].getElementsByTagName('PictureURL')[0].textContent;
          }
          const jx = hotels[i].getElementsByTagName('X')[0].textContent / 1000 / 3600;
          const jy = hotels[i].getElementsByTagName('Y')[0].textContent / 1000 / 3600;
          const wx = (jx - jy * 0.000046038 - jx * 0.000083043 + 0.010040);
          const wy = (jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017);

          hotelData[i] = {
            HotelID: hotelId,
            HotelName: hotelName,
            HotelAddress: hotelAddress,
            PlanSampleRateFrom: planSampleRateFrom,
            PictureURL: pictureURL,
            HotelUrl: hotelURL,
            HotelReview: hotelReview,
            X: wx,
            Y: wy,
            State: 'noVacancy',
          };
        }

        start1 += 100;
        hotelsData = hotelsData.concat(hotelData);
        lodgingSpot(`http://jws.jalan.net/APIAdvance/HotelSearch/V1/?key=${jalanKey}&s_area=192002&start=${start1}&count=100&xml_ptn=2`, dispatch);
      } else if (request.status === 400) {
        lodgingVacancySpot(`http://jws.jalan.net/APIAdvance/StockSearch/V1/?key=${jalanKey}&s_area=192002&stay_date=${timeData}&start=${start2}&count=100&order=2`, dispatch);
      }
    }
  };

  request.open('GET', url);
  request.send();
};

// 宿泊地取得
lodgingVacancySpot = (url, dispatch) => {
  let hotelData = [];
  const parser = new DOMParser();
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState !== 4) {
      return;
    }

    if (request.readyState === 4) {
      if (request.status === 200) {
        const sMyString = request.responseText;
        const dom = parser.parseFromString(sMyString, 'text/xml');
        const hotels = dom.getElementsByTagName('Plan');

        for (let i = 0; i < hotels.length; i += 1) {
          let pictureURL = '';
          const hotelId = hotels[i].getElementsByTagName('HotelID')[0].textContent;
          const hotelName = hotels[i].getElementsByTagName('HotelName')[0].textContent;
          const sampleRate = hotels[i].getElementsByTagName('SampleRate')[0].textContent;
          const hotelAddress = hotels[i].getElementsByTagName('HotelAddress')[0].textContent;
          const hotelURL = hotels[i].getElementsByTagName('HotelDetailURL')[0].textContent;
          const hotelReview = hotels[i].getElementsByTagName('Rating')[0].textContent;
          if (hotels[i].getElementsByTagName('PictureURL')[0] !== undefined) {
            pictureURL = hotels[i].getElementsByTagName('PictureURL')[0].textContent;
          }
          const jx = hotels[i].getElementsByTagName('X')[0].textContent / 1000 / 3600;
          const jy = hotels[i].getElementsByTagName('Y')[0].textContent / 1000 / 3600;
          const wx = (jx - jy * 0.000046038 - jx * 0.000083043 + 0.010040);
          const wy = (jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017);

          hotelData[i] = {
            HotelID: hotelId,
            HotelName: hotelName,
            PlanSampleRateFrom: sampleRate,
            HotelAddress: hotelAddress,
            HotelUrl: hotelURL,
            PictureURL: pictureURL,
            HotelReview: hotelReview,
            X: wx,
            Y: wy,
            State: 'vacancy',
          };
        }

        hotelData = hotelData.filter((v1, i1, a1) => (a1.findIndex(v2 => (v1.HotelID === v2.HotelID)) === i1));
        // 100件の空室データから重複したIDを削除(値段が安いのが残る)
        vacancysData = vacancysData.concat(hotelData);
        start2 += 100;
        lodgingVacancySpot(`http://jws.jalan.net/APIAdvance/StockSearch/V1/?key=${jalanKey}&s_area=192002&stay_date=${timeData}&start=${start2}&count=100&order=2`, dispatch);
      } else if (request.status === 400) {
        // 全ての空室データから重複したIDを削除(値段が安いのが残る)
        vacancysData = vacancysData.filter((v1, i1, a1) => (a1.findIndex(v2 => (v1.HotelID === v2.HotelID)) === i1));
        // 空室データと宿泊施設データを結合し、重複したIDを削除(空室データが優先して残る)
        lodgingSpotData = vacancysData.concat(hotelsData);
        lodgingSpotData = lodgingSpotData.filter((v1, i1, a1) => (a1.findIndex(v2 => (v1.HotelID === v2.HotelID)) === i1));
        dispatch(getPostsSuccess(lodgingSpotData));
      }
    }
  };
  request.open('GET', url);
  request.send();
};

export const getPostsLodging = () => (dispatch) => {
  dispatch(getPostsRequest());

  lodgingSpot('http://jws.jalan.net/APIAdvance/HotelSearch/V1/?key=${jalanKey}&s_area=192002&start=${start1}&count=100&xml_ptn=2', dispatch);

};
