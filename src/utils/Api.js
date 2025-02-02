import React from 'react';
function Api() {
  const BASE_URL = 'https://aelia.website/api';

  function register(data) {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 201) {
        return res.json();
      } else {
        if (res.status === 409) {
          return Promise.reject('Пользователь с таким email уже существует.');
        } else {
          return Promise.reject(
            'При регистрации пользователя произошла ошибка'
          );
        }
      }
    });
  }

  function login(data) {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401) {
        return Promise.reject('Вы ввели неправильный логин или пароль');
      } else {
        return Promise.reject(
          'При авторизации произошла ошибка. Токен не передан или передан не в том формате'
        );
      }
    });
  }

  const getUser = React.useCallback((token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401) {
        return Promise.reject(
          'При авторизации произошла ошибка. Переданный токен некорректен.'
        );
      } else {
        return Promise.reject(
          'При авторизации произошла ошибка. Токен не передан или передан не в том формате'
        );
      }
    });
  }, []);

  function editProfileData(newData) {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: newData.name,
        email: newData.email,
      }),
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 409) {
        return Promise.reject('Пользователь с таким email уже существует.');
      } else if (res.status === 401) {
        return Promise.reject(res.status);
      } else {
        return Promise.reject('При обновлении профиля произошла ошибка.');
      }
    });
  }

  function returnRes(res) {
    if (res.status === 201) {
      return res.json();
    } else if (res.status === 401) {
      return Promise.reject(res.status);
    } else {
      return Promise.reject();
    }
  }

  const getHouses = React.useCallback(() => {
    return fetch(`${BASE_URL}/houses/find-my-houses`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    }).then((res) => {
      return returnRes(res);
    });
  }, []);

  function createHouse(data) {
    return fetch(`${BASE_URL}/houses/new-house`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return returnRes(res);
    });
  }

  function deleteHouse(id) {
    return fetch(`${BASE_URL}/houses/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      return returnRes(res);
    });
  }

  function renameHouse(id, data) {
    return fetch(`${BASE_URL}/houses/${id}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return returnRes(res);
    });
  }

  function reorderZones(id, data) {
    return fetch(`${BASE_URL}/houses/${id}/reorder`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return returnRes(res);
    });
  }

  function renameZone(id, number, data) {
    return fetch(`${BASE_URL}/houses/${id}/${number}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return returnRes(res);
    });
  }

  function addTask(id, number, data) {
    return fetch(`${BASE_URL}/houses/${id}/${number}/new-task`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return returnRes(res);
    });
  }

  function deleteTask(data) {
    return fetch(
      `${BASE_URL}/houses/${data.houseId}/${data.zoneNumber}/${data.taskNumber}/delete`,
      {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-type': 'application/json',
        },
      }
    ).then((res) => {
      return returnRes(res);
    });
  }

  function renameTask(data, name) {
    return fetch(
      `${BASE_URL}/houses/${data.houseId}/${data.zoneNumber}/${data.taskNumber}/rename`,
      {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(name),
      }
    ).then((res) => {
      return returnRes(res);
    });
  }

  function fulfilTask(houseId, zoneNumber) {
    return fetch(`${BASE_URL}/houses/${houseId}/${zoneNumber}/complete`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    }).then((res) => {
      return returnRes(res);
    });
  }

  function resetDate(houseId, zoneNumber) {
    return fetch(`${BASE_URL}/houses/${houseId}/${zoneNumber}/reset`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    }).then((res) => {
      return returnRes(res);
    });
  }

  return {
    register,
    login,
    getUser,
    editProfileData,
    getHouses,
    createHouse,
    deleteHouse,
    renameHouse,
    reorderZones,
    renameZone,
    addTask,
    deleteTask,
    renameTask,
    fulfilTask,
    resetDate,
  };
}

export default Api;
