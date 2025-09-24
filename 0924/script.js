document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const currentLocationButton = document.getElementById('currentLocationButton');
    const mapDiv = document.getElementById('map');
    const aedList = document.getElementById('aedList');

    // 서비스 키가 포함된 API URL
    const apiUrl = 'https://apis.data.go.kr/6260000/BusanAedsService/getAedsList?serviceKey=hQaOr9di8jiAlwmqj0XIgxNFKln7%2B78Qjv5rYRJQWzV9JtQGc%2BJNfPMlxUYoqhkoRJF5IN7a7BJOtpVrGSaBqw%3D%3D&pageNo=1&numOfRows=10&resultType=json';

    // API로부터 AED 데이터를 가져오는 함수
    const fetchAedData = async () => {
        try {
            const response = await fetch(apiUrl);
            
            // 응답이 성공적인지 확인
            if (!response.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다 ' + response.statusText);
            }

            const data = await response.json();
            console.log('API 접근 성공'); // API 접근 성공 시 메시지 출력
            console.log(data); // 데이터 구조 확인을 위해 콘솔에 로그 출력
            
            // 이제 웹페이지에 데이터를 가공하여 표시
            displayAedList(data);

        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
            aedList.innerHTML = '<li>데이터를 가져오는 중 오류가 발생했습니다.</li>';
        }
    };

    // 웹페이지에 데이터를 표시하는 함수
    const displayAedList = (data) => {
        // 이전 결과 지우기
        aedList.innerHTML = ''; 

        // 데이터가 존재하고 항목 목록을 가지고 있는지 확인
        if (data.response && data.response.body && data.response.body.items) {
            const aeds = data.response.body.items.item;
            
            if (aeds && aeds.length > 0) {
                aeds.forEach(aed => {
                    const listItem = document.createElement('li');
                    // JSON 키 이름에 맞춰서 데이터를 표시합니다.
                    // addrs: 주소, product_nm: 제품명
                    listItem.textContent = `제품명: ${aed.product_nm}, 주소: ${aed.addrs}`;
                    aedList.appendChild(listItem);
                });
            } else {
                aedList.innerHTML = '<li>검색된 AED가 없습니다.</li>';
            }
        } else {
            aedList.innerHTML = '<li>데이터 형식이 올바르지 않습니다.</li>';
        }
    };
    
    // 검색 버튼 클릭 이벤트
    searchButton.addEventListener('click', () => {
        fetchAedData(); 
        alert("데이터를 불러옵니다. 잠시만 기다려주세요.");
    });

    // 현재 위치 버튼 클릭 이벤트
    currentLocationButton.addEventListener('click', () => {
        alert('현재 위치 기능은 구현되지 않았습니다. 데이터를 불러옵니다.');
        fetchAedData();
    });
});