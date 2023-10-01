import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Draw } from "../pages/ads/Draw";
import { Refer } from "../pages/ads/Refer";
import { Add } from "../pages/ads/Add";

const HookContext = createContext(null);

export const Hook = ({ children }) => {
    const location = useLocation();
    const endpoint = "https://api.thelikey.com/api";
    const [showMenu, setShowMenu] = useState(false);
    const [promotionTypes, setPromotionTypes] = useState([]);
    const [crypto, setCrypto] = useState(0);
    const [token, setToken] = useState();
    const [rate, setRate] = useState(800);
    const [live_key, setLiveKey] = useState('');
    const [usdt, setUSDT] = useState('')
    const [btc, setBTC] = useState('')
    const [bnb, setBNB] = useState('');
    const [tron, setTRON] = useState('');


    const countries = [
        { name: 'Afghanistan', code: 'AF' },
        { name: 'Åland Islands', code: 'AX' },
        { name: 'Albania', code: 'AL' },
        { name: 'Algeria', code: 'DZ' },
        { name: 'American Samoa', code: 'AS' },
        { name: 'AndorrA', code: 'AD' },
        { name: 'Angola', code: 'AO' },
        { name: 'Anguilla', code: 'AI' },
        { name: 'Antarctica', code: 'AQ' },
        { name: 'Antigua and Barbuda', code: 'AG' },
        { name: 'Argentina', code: 'AR' },
        { name: 'Armenia', code: 'AM' },
        { name: 'Aruba', code: 'AW' },
        { name: 'Australia', code: 'AU' },
        { name: 'Austria', code: 'AT' },
        { name: 'Azerbaijan', code: 'AZ' },
        { name: 'Bahamas', code: 'BS' },
        { name: 'Bahrain', code: 'BH' },
        { name: 'Bangladesh', code: 'BD' },
        { name: 'Barbados', code: 'BB' },
        { name: 'Belarus', code: 'BY' },
        { name: 'Belgium', code: 'BE' },
        { name: 'Belize', code: 'BZ' },
        { name: 'Benin', code: 'BJ' },
        { name: 'Bermuda', code: 'BM' },
        { name: 'Bhutan', code: 'BT' },
        { name: 'Bolivia', code: 'BO' },
        { name: 'Bosnia and Herzegovina', code: 'BA' },
        { name: 'Botswana', code: 'BW' },
        { name: 'Bouvet Island', code: 'BV' },
        { name: 'Brazil', code: 'BR' },
        { name: 'British Indian Ocean Territory', code: 'IO' },
        { name: 'Brunei Darussalam', code: 'BN' },
        { name: 'Bulgaria', code: 'BG' },
        { name: 'Burkina Faso', code: 'BF' },
        { name: 'Burundi', code: 'BI' },
        { name: 'Cambodia', code: 'KH' },
        { name: 'Cameroon', code: 'CM' },
        { name: 'Canada', code: 'CA' },
        { name: 'Cape Verde', code: 'CV' },
        { name: 'Cayman Islands', code: 'KY' },
        { name: 'Central African Republic', code: 'CF' },
        { name: 'Chad', code: 'TD' },
        { name: 'Chile', code: 'CL' },
        { name: 'China', code: 'CN' },
        { name: 'Christmas Island', code: 'CX' },
        { name: 'Cocos (Keeling) Islands', code: 'CC' },
        { name: 'Colombia', code: 'CO' },
        { name: 'Comoros', code: 'KM' },
        { name: 'Congo', code: 'CG' },
        { name: 'Congo, The Democratic Republic of the', code: 'CD' },
        { name: 'Cook Islands', code: 'CK' },
        { name: 'Costa Rica', code: 'CR' },
        { name: 'Cote D\'Ivoire', code: 'CI' },
        { name: 'Croatia', code: 'HR' },
        { name: 'Cuba', code: 'CU' },
        { name: 'Cyprus', code: 'CY' },
        { name: 'Czech Republic', code: 'CZ' },
        { name: 'Denmark', code: 'DK' },
        { name: 'Djibouti', code: 'DJ' },
        { name: 'Dominica', code: 'DM' },
        { name: 'Dominican Republic', code: 'DO' },
        { name: 'Ecuador', code: 'EC' },
        { name: 'Egypt', code: 'EG' },
        { name: 'El Salvador', code: 'SV' },
        { name: 'Equatorial Guinea', code: 'GQ' },
        { name: 'Eritrea', code: 'ER' },
        { name: 'Estonia', code: 'EE' },
        { name: 'Ethiopia', code: 'ET' },
        { name: 'Falkland Islands (Malvinas)', code: 'FK' },
        { name: 'Faroe Islands', code: 'FO' },
        { name: 'Fiji', code: 'FJ' },
        { name: 'Finland', code: 'FI' },
        { name: 'France', code: 'FR' },
        { name: 'French Guiana', code: 'GF' },
        { name: 'French Polynesia', code: 'PF' },
        { name: 'French Southern Territories', code: 'TF' },
        { name: 'Gabon', code: 'GA' },
        { name: 'Gambia', code: 'GM' },
        { name: 'Georgia', code: 'GE' },
        { name: 'Germany', code: 'DE' },
        { name: 'Ghana', code: 'GH' },
        { name: 'Gibraltar', code: 'GI' },
        { name: 'Greece', code: 'GR' },
        { name: 'Greenland', code: 'GL' },
        { name: 'Grenada', code: 'GD' },
        { name: 'Guadeloupe', code: 'GP' },
        { name: 'Guam', code: 'GU' },
        { name: 'Guatemala', code: 'GT' },
        { name: 'Guernsey', code: 'GG' },
        { name: 'Guinea', code: 'GN' },
        { name: 'Guinea-Bissau', code: 'GW' },
        { name: 'Guyana', code: 'GY' },
        { name: 'Haiti', code: 'HT' },
        { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
        { name: 'Holy See (Vatican City State)', code: 'VA' },
        { name: 'Honduras', code: 'HN' },
        { name: 'Hong Kong', code: 'HK' },
        { name: 'Hungary', code: 'HU' },
        { name: 'Iceland', code: 'IS' },
        { name: 'India', code: 'IN' },
        { name: 'Indonesia', code: 'ID' },
        { name: 'Iran, Islamic Republic Of', code: 'IR' },
        { name: 'Iraq', code: 'IQ' },
        { name: 'Ireland', code: 'IE' },
        { name: 'Isle of Man', code: 'IM' },
        { name: 'Israel', code: 'IL' },
        { name: 'Italy', code: 'IT' },
        { name: 'Jamaica', code: 'JM' },
        { name: 'Japan', code: 'JP' },
        { name: 'Jersey', code: 'JE' },
        { name: 'Jordan', code: 'JO' },
        { name: 'Kazakhstan', code: 'KZ' },
        { name: 'Kenya', code: 'KE' },
        { name: 'Kiribati', code: 'KI' },
        { name: 'Korea, Democratic People\'S Republic of', code: 'KP' },
        { name: 'Korea, Republic of', code: 'KR' },
        { name: 'Kuwait', code: 'KW' },
        { name: 'Kyrgyzstan', code: 'KG' },
        { name: 'Lao People\'S Democratic Republic', code: 'LA' },
        { name: 'Latvia', code: 'LV' },
        { name: 'Lebanon', code: 'LB' },
        { name: 'Lesotho', code: 'LS' },
        { name: 'Liberia', code: 'LR' },
        { name: 'Libyan Arab Jamahiriya', code: 'LY' },
        { name: 'Liechtenstein', code: 'LI' },
        { name: 'Lithuania', code: 'LT' },
        { name: 'Luxembourg', code: 'LU' },
        { name: 'Macao', code: 'MO' },
        { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
        { name: 'Madagascar', code: 'MG' },
        { name: 'Malawi', code: 'MW' },
        { name: 'Malaysia', code: 'MY' },
        { name: 'Maldives', code: 'MV' },
        { name: 'Mali', code: 'ML' },
        { name: 'Malta', code: 'MT' },
        { name: 'Marshall Islands', code: 'MH' },
        { name: 'Martinique', code: 'MQ' },
        { name: 'Mauritania', code: 'MR' },
        { name: 'Mauritius', code: 'MU' },
        { name: 'Mayotte', code: 'YT' },
        { name: 'Mexico', code: 'MX' },
        { name: 'Micronesia, Federated States of', code: 'FM' },
        { name: 'Moldova, Republic of', code: 'MD' },
        { name: 'Monaco', code: 'MC' },
        { name: 'Mongolia', code: 'MN' },
        { name: 'Montserrat', code: 'MS' },
        { name: 'Morocco', code: 'MA' },
        { name: 'Mozambique', code: 'MZ' },
        { name: 'Myanmar', code: 'MM' },
        { name: 'Namibia', code: 'NA' },
        { name: 'Nauru', code: 'NR' },
        { name: 'Nepal', code: 'NP' },
        { name: 'Netherlands', code: 'NL' },
        { name: 'Netherlands Antilles', code: 'AN' },
        { name: 'New Caledonia', code: 'NC' },
        { name: 'New Zealand', code: 'NZ' },
        { name: 'Nicaragua', code: 'NI' },
        { name: 'Niger', code: 'NE' },
        { name: 'Nigeria', code: 'NG' },
        { name: 'Niue', code: 'NU' },
        { name: 'Norfolk Island', code: 'NF' },
        { name: 'Northern Mariana Islands', code: 'MP' },
        { name: 'Norway', code: 'NO' },
        { name: 'Oman', code: 'OM' },
        { name: 'Pakistan', code: 'PK' },
        { name: 'Palau', code: 'PW' },
        { name: 'Palestinian Territory, Occupied', code: 'PS' },
        { name: 'Panama', code: 'PA' },
        { name: 'Papua New Guinea', code: 'PG' },
        { name: 'Paraguay', code: 'PY' },
        { name: 'Peru', code: 'PE' },
        { name: 'Philippines', code: 'PH' },
        { name: 'Pitcairn', code: 'PN' },
        { name: 'Poland', code: 'PL' },
        { name: 'Portugal', code: 'PT' },
        { name: 'Puerto Rico', code: 'PR' },
        { name: 'Qatar', code: 'QA' },
        { name: 'Reunion', code: 'RE' },
        { name: 'Romania', code: 'RO' },
        { name: 'Russian Federation', code: 'RU' },
        { name: 'RWANDA', code: 'RW' },
        { name: 'Saint Helena', code: 'SH' },
        { name: 'Saint Kitts and Nevis', code: 'KN' },
        { name: 'Saint Lucia', code: 'LC' },
        { name: 'Saint Pierre and Miquelon', code: 'PM' },
        { name: 'Saint Vincent and the Grenadines', code: 'VC' },
        { name: 'Samoa', code: 'WS' },
        { name: 'San Marino', code: 'SM' },
        { name: 'Sao Tome and Principe', code: 'ST' },
        { name: 'Saudi Arabia', code: 'SA' },
        { name: 'Senegal', code: 'SN' },
        { name: 'Serbia and Montenegro', code: 'CS' },
        { name: 'Seychelles', code: 'SC' },
        { name: 'Sierra Leone', code: 'SL' },
        { name: 'Singapore', code: 'SG' },
        { name: 'Slovakia', code: 'SK' },
        { name: 'Slovenia', code: 'SI' },
        { name: 'Solomon Islands', code: 'SB' },
        { name: 'Somalia', code: 'SO' },
        { name: 'South Africa', code: 'ZA' },
        { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
        { name: 'Spain', code: 'ES' },
        { name: 'Sri Lanka', code: 'LK' },
        { name: 'Sudan', code: 'SD' },
        { name: 'Suriname', code: 'SR' },
        { name: 'Svalbard and Jan Mayen', code: 'SJ' },
        { name: 'Swaziland', code: 'SZ' },
        { name: 'Sweden', code: 'SE' },
        { name: 'Switzerland', code: 'CH' },
        { name: 'Syrian Arab Republic', code: 'SY' },
        { name: 'Taiwan, Province of China', code: 'TW' },
        { name: 'Tajikistan', code: 'TJ' },
        { name: 'Tanzania, United Republic of', code: 'TZ' },
        { name: 'Thailand', code: 'TH' },
        { name: 'Timor-Leste', code: 'TL' },
        { name: 'Togo', code: 'TG' },
        { name: 'Tokelau', code: 'TK' },
        { name: 'Tonga', code: 'TO' },
        { name: 'Trinidad and Tobago', code: 'TT' },
        { name: 'Tunisia', code: 'TN' },
        { name: 'Turkey', code: 'TR' },
        { name: 'Turkmenistan', code: 'TM' },
        { name: 'Turks and Caicos Islands', code: 'TC' },
        { name: 'Tuvalu', code: 'TV' },
        { name: 'Uganda', code: 'UG' },
        { name: 'Ukraine', code: 'UA' },
        { name: 'United Arab Emirates', code: 'AE' },
        { name: 'United Kingdom', code: 'GB' },
        { name: 'United States', code: 'US' },
        { name: 'United States Minor Outlying Islands', code: 'UM' },
        { name: 'Uruguay', code: 'UY' },
        { name: 'Uzbekistan', code: 'UZ' },
        { name: 'Vanuatu', code: 'VU' },
        { name: 'Venezuela', code: 'VE' },
        { name: 'Viet Nam', code: 'VN' },
        { name: 'Virgin Islands, British', code: 'VG' },
        { name: 'Virgin Islands, U.S.', code: 'VI' },
        { name: 'Wallis and Futuna', code: 'WF' },
        { name: 'Western Sahara', code: 'EH' },
        { name: 'Yemen', code: 'YE' },
        { name: 'Zambia', code: 'ZM' },
        { name: 'Zimbabwe', code: 'ZW' },
        { name: 'Worldwide', code: 'WW' }
    ]

    const platforms = [
        {
            "id": "1",
            "name": "FACEBOOK",
            "nicename": "facebook",
            "type": "promotion",
            "created_at": "2023-08-05 12:36:58"
        },
        {
            "id": "2",
            "name": "TWITTER",
            "nicename": "twitter",
            "type": "promotion",
            "created_at": "2023-08-05 12:36:58"
        },
        {
            "id": "3",
            "name": "INSTAGRAM",
            "nicename": "instagram",
            "type": "promotion",
            "created_at": "2023-08-05 12:37:29"
        },
        {
            "id": "4",
            "name": "TIKTOK",
            "nicename": "tiktok",
            "type": "promotion",
            "created_at": "2023-08-05 12:37:29"
        },
        {
            "id": "18",
            "name": "LIKEE",
            "nicename": "likee",
            "type": "promotion",
            "created_at": "2023-08-08 11:41:12"
        },
        {
            "id": "19",
            "name": "SNAPCHAT",
            "nicename": "snapchat",
            "type": "promotion",
            "created_at": "2023-08-08 11:41:31"
        },
        {
            "id": "20",
            "name": "TUMBLR",
            "nicename": "tumblr",
            "type": "promotion",
            "created_at": "2023-08-08 11:42:03"
        },
        {
            "id": "21",
            "name": "TWITCH",
            "nicename": "twitch",
            "type": "promotion",
            "created_at": "2023-08-08 11:42:21"
        },
        {
            "id": "22",
            "name": "VK",
            "nicename": "vk",
            "type": "promotion",
            "created_at": "2023-08-08 11:42:40"
        },
        {
            "id": "23",
            "name": "YOUTUBE",
            "nicename": "youtube",
            "type": "promotion",
            "created_at": "2023-08-08 11:42:58"
        },
    ]

    const taskPlatforms = [
        {
            "id": 11,
            "name": "ADS CLICK",
            "nicename": "ads click",
            "type": "task",
            "created_at": "2023-08-08T10:52:21.000000Z"
        },
        {
            "id": 36,
            "name": "AUDIOMACK",
            "nicename": "audiomack",
            "type": "task",
            "created_at": "2023-08-08T11:51:04.000000Z"
        },
        {
            "id": 8,
            "name": "CUSTOM",
            "nicename": "custom",
            "type": "task",
            "created_at": "2023-08-05T16:44:16.000000Z"
        },
        {
            "id": 17,
            "name": "DATA",
            "nicename": "data",
            "type": "task",
            "created_at": "2023-08-08T11:28:13.000000Z"
        },
        {
            "id": 32,
            "name": "DISCORD",
            "nicename": "discord",
            "type": "task",
            "created_at": "2023-08-08T11:46:08.000000Z"
        },
        {
            "id": 14,
            "name": "FEEDBACK",
            "nicename": "feedback",
            "type": "task",
            "created_at": "2023-08-08T11:22:52.000000Z"
        },
        {
            "id": 31,
            "name": "FIVERR",
            "nicename": "fiverr",
            "type": "task",
            "created_at": "2023-08-08T11:45:54.000000Z"
        },
        {
            "id": 27,
            "name": "GOOGLE",
            "nicename": "google",
            "type": "task",
            "created_at": "2023-08-08T11:44:33.000000Z"
        },
        {
            "id": 26,
            "name": "IMDb",
            "nicename": "imdb",
            "type": "task",
            "created_at": "2023-08-08T11:44:21.000000Z"
        },
        {
            "id": 6,
            "name": "LINKEDIN",
            "nicename": "linkedIn",
            "type": "task",
            "created_at": "2023-08-05T16:36:33.000000Z"
        },
        {
            "id": 10,
            "name": "LISTEN",
            "nicename": "listen",
            "type": "task",
            "created_at": "2023-08-08T10:49:58.000000Z"
        },
        {
            "id": 28,
            "name": "MEDIUM",
            "nicename": "medium",
            "type": "task",
            "created_at": "2023-08-08T11:44:53.000000Z"
        },
        {
            "id": 29,
            "name": "PINTEREST",
            "nicename": "pinterest",
            "type": "task",
            "created_at": "2023-08-08T11:45:12.000000Z"
        },
        {
            "id": 16,
            "name": "PLAY",
            "nicename": "play",
            "type": "task",
            "created_at": "2023-08-08T11:26:07.000000Z"
        },
        {
            "id": 34,
            "name": "QUORA",
            "nicename": "quora",
            "type": "task",
            "created_at": "2023-08-08T11:47:08.000000Z"
        },
        {
            "id": 35,
            "name": "REDDIT",
            "nicename": "reddit",
            "type": "task",
            "created_at": "2023-08-08T11:47:30.000000Z"
        },
        {
            "id": 13,
            "name": "RESEARCH",
            "nicename": "research",
            "type": "task",
            "created_at": "2023-08-08T11:21:30.000000Z"
        },
        {
            "id": 12,
            "name": "SIGN UP",
            "nicename": "sign up",
            "type": "task",
            "created_at": "2023-08-08T10:55:33.000000Z"
        },
        {
            "id": 33,
            "name": "SPOTIFY",
            "nicename": "spotify",
            "type": "task",
            "created_at": "2023-08-08T11:46:46.000000Z"
        },
        {
            "id": 24,
            "name": "TELEGRAM",
            "nicename": "telegram",
            "type": "task",
            "created_at": "2023-08-08T11:43:22.000000Z"
        },
        {
            "id": 9,
            "name": "WATCH",
            "nicename": "watch",
            "type": "task",
            "created_at": "2023-08-08T10:47:42.000000Z"
        },
        {
            "id": 25,
            "name": "WEBSITE",
            "nicename": "website",
            "type": "task",
            "created_at": "2023-08-08T11:43:59.000000Z"
        },
        {
            "id": 5,
            "name": "WHATSAPP",
            "nicename": "whatsapp",
            "type": "task",
            "created_at": "2023-08-05T16:36:12.000000Z"
        },
        {
            "id": 15,
            "name": "WRITE",
            "nicename": "write",
            "type": "task",
            "created_at": "2023-08-08T11:24:16.000000Z"
        }
    ]

    const toggleMenu = () => {
        if (showMenu) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }
    }

    const getLiveToken = async () => {
        try {
            const res = await axios.get(`https://api.thelikey.com/api/token`);
            let liveToken = res.data._token
            authToken(liveToken);
        } catch (error) {
            // Handle errors
        }
    }

    const authToken = (liveToken) => {
        let inToken = window.localStorage.getItem('token');

        if (liveToken === "") {
            return;
        }

        if (!inToken) {
            window.localStorage.setItem('token', liveToken)
        }

        if (inToken !== liveToken) {
            window.localStorage.setItem('token', liveToken)
            setToken(liveToken);
        } else {
            setToken(inToken)
        }
    }

    const getPlatformPromotions = async (type) => {
        setPromotionTypes([])
        try {
            let res = await axios.get(`${endpoint}/platform/${type}`);
            setPromotionTypes(res.data);
        } catch (error) {
            // Handle errors
            setPromotionTypes([])
        }
    }

    const getDate = (created_at) => {
        const date_time = new Date(created_at);
        const timestamp = date_time.getTime();

        var a = new Date(timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        // var hour = a.getHours();
        // var min = a.getMinutes();
        // var sec = a.getSeconds();
        var there = a.toLocaleTimeString("en-US")
        var time = date + ' ' + month + ' ' + year + ' ' + there;
        return time;
    }

    const convertToCrypto = async (currency, amount) => {
        try {
            let res = await axios.get(`https://api.coinconvert.net/convert/USD/${currency}?amount=${amount}`);
            if (currency === "usdt") {
                setCrypto(amount);
            }
            if (currency === "bnb") {
                setCrypto(res.data.BNB);
            }
            if (currency === "eth") {
                setCrypto(res.data.ETH);
            }
            if (currency === "btc") {
                setCrypto(res.data.BTC);
            }
        } catch (error) {
            // Handle errors
        }
    }

    const getRate = async () => {
        try {
            let res = await axios.get(`${endpoint}/rate`);
            setRate(res.data.rate)
            setLiveKey(res.data.key)
            setTRON(res.data.tron);
            setUSDT(res.data.usdt);
            setBNB(res.data.bnb);
            setBTC(res.data.btc);
        } catch (error) {
            setRate(800);
            setLiveKey('');
            setTRON();
            setUSDT();
            setBNB();
            setBTC();
        }
    }

    const validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const pickAd = () => {
        const rndInt = Math.floor(Math.random() * 3) + 1
        if (rndInt === 1) {
            return <Draw />
        }
        if (rndInt === 2) {
            return <Add />
        }
        if (rndInt === 3) {
            return <Refer />
        }
    }

    const proofsApproval = async () => {
        try {
            const res = await axios.get(`https://api.thelikey.com/api/admin/aprove_all`);
        } catch (error) {
            // Handle errors
        }
    }

    useEffect(() => {
        getLiveToken();
        setShowMenu(false);
        getRate();
        proofsApproval();

        return () => {
            return true
        }
    }, [location])

    return (
        <HookContext.Provider
            value={{
                endpoint, showMenu, token, countries, platforms, promotionTypes, taskPlatforms, crypto, rate, live_key, usdt, btc, bnb, tron,
                toggleMenu, getPlatformPromotions, getDate, convertToCrypto, validateEmail, pickAd,
            }}
        > {children}
        </HookContext.Provider>
    )
}

export const useHook = () => {
    return useContext(HookContext);
}
