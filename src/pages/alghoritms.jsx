import choice_11 from '../../img/choice_11.png'
import choice_12 from '../../img/choice_12.png'
import Button from '@mui/material/Button';
export const Alg1 = () => {
    return (
            <div className='imageAlg'>
                <h2>Информация получена из заявления потерпевшего</h2>
                <img src={choice_11}></img><br/>
                <Button variant="contained" href="/algorithm/1/main" size='large' color="success" sx={{marginTop:1}}>Выбрать алгоритм</Button>
            </div>
        )
}
export const Alg2 = () => {
    return (
            <div className='imageAlg'>
                <h2>Сведения получены по результатам оперативно-розыскной деятельности</h2>
                <img src={choice_12}/><br/>
                <Button variant="contained" href="/algorithm/2/main" size='large' color="success" sx={{marginTop:1}}>Выбрать алгоритм</Button>
            </div>
        )
}

export const Alg3 = () => {
    return (
            <>
                <h2>Установлен способ совершения преступления, потерпевшие и свидетели, выявлены цифровые следы, данные о преступнике имеются</h2>
                <p className="description">
                    1.Постановление о возбуждении уголовного дела;
                    <br/>2.	Постановление о признании потерпевшим;
                    <br/>3.	Допрос потерпевшего; 
                    <br/>4.	Истребование необходимых документов у потерпевшего
                    <br/>5.	Выемка у потерпевшего предметов, оставленных мошенником 
                    <br/>6.	Выемка и осмотр  компьютерных  и  мобильных устройств  потерпевших  с  участием  специалистов  и применением специальных технических средств
                    <br/>7.	Допрос свидетелей; 
                    <br/>8.	Направление запросов
                    <br/>8.1. Направление запросов в банки и кредитные организации о предоставлении данных владельца счета, на который в результате мошенничества были перечислены денежные средства;
                    <br/>8.2. Направление запросов регистраторам доменного имени о предоставлении сведений об администраторе (владельце) доменного имени сайта мошеннического интернет-магазина;
                    <br/>8.3. Направление запроса информации оператору связи о лице, на которое зарегистрирован абонентский номер;
                    <br/>8.4. Направление запросов провайдерам о предоставлении информации об интернет- соединениях абонента или абонентского устройства.
                    <br/>9.	Проведение опознания преступника по фото; 
                    <br/>10.	Осмотр изъятых у потерпевшего предметов; 
                    <br/>11.	 Назначение необходимых экспертиз. 
                    <br/>12.	Освидетельствование; 
                    <br/>13.	Допрос задержанного; 
                    <br/>14.	Проведение очных ставок между задержанным и потерпевшим, свидетелями; 
                    <br/>15.	 Обыск по месту жительства задержанного; 
                    <br/>16.	Назначение дополнительных экспертиз
                    <br/>17.	 Потерпевшим и свидетелям предъявляются фото-  и видеоучеты органа внутренних дел;  
                    <br/>18.	Составляется композиционный портрет или фоторобот мошенника;  
                    <br/>19.	Об обстоятельствах совершенного преступления оповещаются соседние органы внутренних дел;  
                    <br/>20.	В случае если после совершения преступления прошло незначительное время, производится патрулирование прилегающей территории работниками ГИБДД, ППС, оперуполномоченными, участковыми уполномоченными полиции; 
                    <br/>21.	Осуществляются ОРМ, направленные на установление очевидцев и иных свидетелей; 
                    <br/>22.	 Проводится работа с учетами (дактилоскопическим при наличии оставленных следов рук; по способу совершения преступления).
                    <br/>23.	Задержание подозреваемого
                    <br/>24.	Проведение осмотра мест применения компьютерного оборудования и осмотра компьютерных устройств, использованных для совершения преступления.
                </p>
                <Button variant="contained" href="/algorithm/3/main" size='large' color="success" sx={{marginTop:1}}>Выбрать алгоритм</Button>
            </>
        )
}

export const Alg4 = () => {
    return (
            <>
                <h2>Установлен способ совершения преступления, потерпевшие и свидетели, выявлены цифровые следы, данные о преступнике отсутсвуют</h2>
                <p className="description">
                    1.	Постановление о возбуждении уголовного дела;
                    <br/>2.	Постановление о признании потерпевшим;
                    <br/>3.	Истребование необходимых документов у потерпевшего;
                    <br/>4.	Изучение выписок о движении денежных средств на банковских счетах потерпевшего
                    <br/>5.	Выемка документов, подтверждающих факт совершения хищения
                    <br/>6.	Допрос потерпевшего
                    <br/>7.	Допрос свидетелей
                    <br/>8.	Выемка и осмотр компьютерных и  мобильных устройств  потерпевших  с  участием специалистов  и применением специальных технических средств. Изучение цифрового следа.
                    <br/>9.	Направление запросов
                    <br/>9.1.	Направление запросов в банки и кредитные организации о предоставлении данных владельца счета, на который в результате мошенничества были перечислены денежные средства
                    <br/>9.2.	Направление запросов регистраторам доменного имени о предоставлении сведений об администраторе (владельце) доменного имени сайта мошеннического интернет-магазина.
                    <br/>9.3.	Направление запроса информации оператору связи о лице, на которое зарегистрирован абонентский номер
                    <br/>9.4.	Направление запросов провайдерам о предоставлении информации об интернет- соединениях абонента или абонентского устройства
                    <br/>10.	Проверка и истребование информации о преступнике и его месте жительства по базам ИЦ и ГИАЦ
                    <br/>11.	Составление поручения оперативным подразделениям
                    <br/>12.	Назначение экспертиз
                    <br/>12.1.	Компьютерной  и  иных экспертиз.
                </p>
                <Button variant="contained" href="/algorithm/4/main" size='large' color="success" sx={{marginTop:1}}>Выбрать алгоритм</Button>
            </>
        )
}

export const Alg5 = () => {
    return (
            <>
                <h2>Установлен способ совершения преступления, цифровые следы, потерпевшие, данные о преступнике отсутсвуют</h2>
                <p className="description">
                    1.	Вынесение постановление о возбуждении уголовного дела;
                    <br/>2.	Вынесение постановление о признании потерпевшим;
                    <br/>3.	Истребование необходимых документов у потерпевшего; 
                    <br/>4.	Выемка документов, подтверждающих факт совершения хищения в потерпевшего;
                    <br/>5.	Изучение выписок о движении денежных средств на банковских счетах потерпевшего. 
                    <br/>6.	Проведение допроса потерпевшего;
                    <br/>7.	Осмотр места происшествия (в случае совершения преступления с использованием компьютерных устройств)
                    <br/>8.	Выемка предметом, документов, технических средств обнаруженных при осмотре места происшествия
                    <br/>9.	Направление запросов (в зависимости от средства совершения преступления);
                    <br/>9.1.	Направление запроса об информации оператору связи о лице, на которое зарегистрирован абонентский номер
                    <br/>9.2.	Направление запросов регистраторам доменного имени о предоставлении сведений об администраторе (владельце) доменного имени сайта мошеннического интернет- магазина
                    <br/>9.3.	Направление запросов в банки и кредитные организации о предоставлении данных владельца счета, на который в результате мошенничества были перечислены денежные средства
                    <br/>10.	Анализ полученной информации;
                    <br/>11.	Проверка и истребование информации о владельце (абонентского номера/доменного имени/ банковского счёта) его месте жительства по базам ИЦ и ГИАЦ
                    <br/>12.	Допросы свидетелей
                    <br/>13.	Выемка и осмотр компьютерных / мобильных устройств  у подозреваемого с  участием  специалистов  и применением специальных технических средств.
                    <br/>14.	Составление поручения оперативным подразделениям
                    <br/>15.	Назначение судебной экспертизы.
                </p>
                <Button variant="contained" href="/algorithm/5/main" size='large' color="success" sx={{marginTop:1}}>Выбрать алгоритм</Button>
            </>
        )
}

export const Alg6 = () => {
    return (
            <>
                    <h2>Не установлен способ совершения преступления, данные о преступнике отсутсвуют</h2>
                    <p className="description">
                        1.	Постановление о возбуждении уголовного дела;
                        <br/>2.	Постановление о признании потерпевшим;
                        <br/>3.	Допрос потерпевшего
                        <br/>4.	Истребование необходимых документов у потерпевшего
                        <br/>5.	Выемка документов, подтверждающих факт совершения хищения
                        <br/>6.	Проведение допроса свидетелей
                        <br/>7.	Установление способа совершения преступления
                        <br/>8.	Установления средства совершения преступления
                        <br/>9.	Направление запросов
                        <br/>10.	Проверка и истребование информации о преступнике и его месте жительства по базам ИЦ и ГИАЦ
                        <br/>11.	Составление поручения оперативным подразделениям
                        <br/>12.	Назначение экспертиз
                    </p>
                <Button variant="contained" href="/algorithm/6/main" size='large' color="success" sx={{marginTop:1}}>Выбрать алгоритм</Button>
            </>
        )
}
