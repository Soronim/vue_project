<template>
    <main class="main">

        <!-- Page Title -->
        

        <!-- Login Section -->
        <section id="login-section" class="login-section section">

            <!-- Section Title -->
            <div class="container section-title" data-aos="fade-up">
                <h2>Account Login</h2>
                <p><span>Secure Access</span> <span class="description-title">To Your Account</span></p>
            </div><!-- End Section Title -->

            <div class="container" data-aos="fade-up">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <div class="login-card">
                            <form class="login-form">
                                <div class="form-group">
                                    <label for="email">Email Address</label>
                                    <input type="email" class="form-control" id="email" placeholder="Enter your email"
                                        required>
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" class="form-control" id="password"
                                        placeholder="Enter your password" required>
                                    <div class="text-right mt-2">
                                        <a href="#forgot-password" class="forgot-password">Forgot password?</a>
                                    </div>
                                </div>
                                <div class="form-group form-check">
                                    <input type="checkbox" class="form-check-input" id="remember">
                                    <label class="form-check-label" for="remember">Remember me</label>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block">Login</button>
                            </form>

                            <div class="login-divider">
                                <span>or continue with</span>
                            </div>

                            <div class="social-login">
                                <button class="btn btn-social btn-google">
                                    <i class="bi bi-google"></i> Google
                                </button>
                                <button class="btn btn-social btn-facebook">
                                    <i class="bi bi-facebook"></i> Facebook
                                </button>
                            </div>

                            <div class="register-link text-center mt-4">
                                Don't have an account? <a href="#register">Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section><!-- /Login Section -->

    </main>
</template>
<script>
export default {
    name: 'LoginPage'
}
</script>