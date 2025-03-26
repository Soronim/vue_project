import axios from "axios";

const API_BASE_URL = 'https://webcomp.bsu.ru/api';

export default {
    /**
     * Получает данные пользователя по токену.
     * @param {string} token - Токен авторизации.
     * @returns {Promise} - Промис с данными пользователя.
     */
    getUserData(token) {
        return axios.get(`${API_BASE_URL}/userData`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.data.data) // Возвращаем только данные пользователя
        .catch(error => {
            console.error('Ошибка при получении данных пользователя:', error);
            throw error; // Пробрасываем ошибку для обработки в компоненте
        });
    }
};