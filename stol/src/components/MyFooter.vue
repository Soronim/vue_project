<template>
    <footer id="footer" class="footer dark-background">
        <div class="container">
        <div class="row gy-3">
            <div class="col-lg-3 col-md-6 d-flex">
            <i class="bi bi-geo-alt icon"></i>
            <div class="address">
                <h4>Адрес</h4>
                <p>Созвездие весов</p>
                <p>Третья планета</p>
                <p></p>
            </div>
            </div>

            <div class="col-lg-3 col-md-6 d-flex">
            <i class="bi bi-telephone icon"></i>
            <div>
                <h4>Контакты</h4>
                <p>
                <strong>Телефон:</strong> <span>+1 5589 55488 55</span><br>
                <strong>Email:</strong> <span>food@brahium.com</span><br>
                </p>
            </div>
            </div>

            <div class="col-lg-3 col-md-6 d-flex">
            <i class="bi bi-clock icon"></i>
            <div>
                <h4>Время работы</h4>
                <p>
                <strong>Пн-Пт:</strong> <span>11 - 24</span><br>
                <strong>Сб-Вс</strong>: <span>10 - 01</span>
                </p>
            </div>
            </div>
        </div>
        </div>

        <div class="container copyright text-center mt-4">
        <p>© <strong class="px-1 sitename"><slot></slot></strong> </p>      
        </div>
    </footer>
</template>
<script>
export default{
    name:"MyFooter"
}
</script>