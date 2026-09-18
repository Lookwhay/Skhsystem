import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherCard = () => {
    const [dayTh, setDayTh] = useState('');
    const [dayEn, setDayEn] = useState('');
    const [temp, setTemp] = useState<number | string>('--');
    const [locationName, setLocationName] = useState<string>('กำลังดึงข้อมูลตำแหน่ง...');

    /*
    useEffect(() => {
        // 1. ดึงวันปัจจุบัน
        const now = new Date();
        const thDay = now.toLocaleDateString('th-TH', { weekday: 'long' });
        const enDay = now.toLocaleDateString('en-US', { weekday: 'long' });

        setDayTh(thDay); // เช่น "วันศุกร์"
        setDayEn(enDay); // เช่น "Friday"

        const apiKey = 'a5cc040b2eb1c6fcd6bcb1799c244b62'; // ใส่ API Key ของคุณ

        // 2. ดึงอุณหภูมิเรียลไทม์ (ตัวอย่างใช้ OpenWeatherMap API)
        const fetchWeather = async () => {
            try {
                const city = 'Bangkok';
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

                console.log('API Data:', res.data); // ดูโครงสร้างข้อมูลที่ส่งกลับมา

                if (res.data && res.data.main) {
                    setTemp(String(Math.round(res.data.main.temp)));
                }

            } catch (error) {
                console.error('Error fetching weather:', error);
            }
        };



        fetchWeather();
    }, []);
    */

    useEffect(() => {
        // 1. ดึงวันปัจจุบัน
        const now = new Date();
        setDayTh(now.toLocaleDateString('th-TH', { weekday: 'long' }));
        setDayEn(now.toLocaleDateString('en-US', { weekday: 'long' }));

        const apiKey = 'a5cc040b2eb1c6fcd6bcb1799c244b62';

        // ดึงอากาศด้วยชื่อเมือง (Fallback)
        const fetchWeatherByCity = async (cityName: string) => {
            try {
                const res = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=th&appid=${apiKey}`
                );
                if (res.data && res.data.main) {
                    setTemp(Math.round(res.data.main.temp));
                    setLocationName(res.data.name);
                }
            } catch (error) {
                console.error('Error fetching city weather:', error);
                setLocationName('ไม่พบข้อมูล');
            }
        };

        // ดึงอากาศด้วยพิกัด GPS
        const fetchWeatherByCoords = async (lat: number, lon: number) => {
            try {
                const res = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=th&appid=${apiKey}`
                );
                if (res.data && res.data.main) {
                    setTemp(Math.round(res.data.main.temp));
                    setLocationName(res.data.name);
                }
            } catch (error) {
                console.error('Error fetching coords weather:', error);
                fetchWeatherByCity('Sakon Nakhon');
            }
        };

        // 2. ตรวจสอบพิกัด GPS ของผู้ใช้
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherByCoords(latitude, longitude);
                },
                (error) => {
                    console.warn('Geolocation denied or failed:', error);
                    fetchWeatherByCity('Sakon Nakhon');
                }
            );
        } else {
            fetchWeatherByCity('Sakon Nakhon');
        }
    }, []);

    return (
        <div className="card tale-bg">
            <div className="card-people mt-auto">
                <img src="images/dashboard/people.svg" alt="people" />
                <div className="weather-info">
                    <div className="d-flex">
                        <div>
                            <h2 className="mb-0 font-weight-normal">
                                <i className="icon-sun mr-2" />
                                {temp}<sup>C</sup>
                            </h2>
                            <h6 className="font-weight-normal">{locationName}</h6>
                        </div>
                        <div className="ml-2">
                            <h4 className="location font-weight-normal">{dayTh}</h4>
                            <h6 className="font-weight-normal">{dayEn}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;