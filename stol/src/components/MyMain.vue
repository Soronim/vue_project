<template>
  <!-- Hero Section -->

  <MyPromo v-if="showPromo"></MyPromo>
  <!-- About Section -->
  <section id="about" class="about section">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>О нас<br></h2>
      <p><span>Немного информации</span> <span class="description-title">О нас</span></p>
    </div><!-- End Section Title -->

    <div class="container">

      <div class="row gy-4">
        <div class="col-lg-7" data-aos="fade-up" data-aos-delay="100">
          <img src="/img/about.jpg" class="img-fluid mb-4" alt="">
        </div>
        <div class="col-lg-5" data-aos="fade-up" data-aos-delay="250">
          <div class="content ps-0 ps-lg-5">
            <p class="fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore
              magna aliqua.
            </p>
            <ul>
              <li><i class="bi bi-check-circle-fill"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.</span></li>
              <li><i class="bi bi-check-circle-fill"></i> <span>Duis aute irure dolor in reprehenderit in voluptate
                  velit.</span></li>
              <li><i class="bi bi-check-circle-fill"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat
                  nulla pariatur.</span></li>
            </ul>
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident
            </p>
            <p>Подробнее (тут <a
                href="https://ru.wikipedia.org/wiki/%D0%A1%D0%B8%D0%B3%D0%BC%D0%B0_%D0%92%D0%B5%D1%81%D0%BE%D0%B2">ссылка</a>)
            </p>

          </div>
        </div>
      </div>

    </div>

  </section><!-- /About Section -->



  <!-- Stats Section -->
  <section id="stats" class="stats section dark-background">

    <img src="/img/stats-bg.jpg" alt="" data-aos="fade-in">

    <div class="container position-relative" data-aos="fade-up" data-aos-delay="100">

      <div class="row gy-4">

        <div class="offset-lg-3 offset-md-3 col-lg-3 col-md-6">
          <div class="stats-item text-center w-100 h-100">
            <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1"
              class="purecounter"></span>
            <p>Заявок: 294</p>
          </div>
        </div><!-- End Stats Item -->

        <div class="col-lg-3 col-md-6">
          <div class="stats-item text-center w-100 h-100">
            <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1"
              class="purecounter"></span>
            <p>Блюд: 410</p>
          </div>
        </div><!-- End Stats Item -->



      </div>

    </div>

  </section><!-- /Stats Section -->

  <!-- Menu Section -->
  
  <DishList></DishList>


  <!-- Book A Table Section -->
  <section id="book-a-table" class="book-a-table section ">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Заказать столик</h2>
      <p><span>Закажите</span> <span class="description-title">столик<br></span></p>
    </div><!-- End Section Title -->

    <div class="container">

      <div class="row g-0" data-aos="fade-up" data-aos-delay="100">

        <div class="col-lg-4 reservation-img" style="background-image: url(/img/reservation.jpg);"></div>

        <div class="col-lg-8 d-flex align-items-center reservation-form-bg" data-aos="fade-up" data-aos-delay="200">
          <form action="#" method="post" role="form" class="php-email-form">
            <div class="row gy-4">
              <div class="col-lg-4 col-md-6">
                <input type="text" name="name" class="form-control" id="name" placeholder="Имя" required="">
              </div>
              <div class="col-lg-4 col-md-6">
                <input type="email" class="form-control" name="email" id="email" placeholder="Email" required="">
              </div>
              <div class="col-lg-4 col-md-6">
                <input type="text" class="form-control" name="phone" id="phone" placeholder="Телефон" required="">
              </div>
              <div class="col-lg-4 col-md-6">
                <input type="date" name="date" class="form-control" id="date" placeholder="Дата" required="">
              </div>
              <div class="col-lg-4 col-md-6">
                <input type="time" class="form-control" name="time" id="time" placeholder="Время" required="">
              </div>
              <div class="col-lg-4 col-md-6">
                <input type="number" class="form-control" name="people" id="people" placeholder="Количество гостей"
                  required="">
              </div>
            </div>

            <div class="text-center mt-3">
              <button type="submit">Заказать столик</button>
            </div>
          </form>
        </div><!-- End Reservation Form -->

      </div>

    </div>

  </section><!-- /Book A Table Section -->
</template>

<script>
import DishList from './DishList.vue';
import MyPromo from './MyPromo.vue';

export default {
  name: "MyMain",
  components:{
    MyPromo,
    DishList
  }
  ,props: {
    showPromo: Boolean
  }
}
</script>