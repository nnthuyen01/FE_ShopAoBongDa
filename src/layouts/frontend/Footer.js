import React from "react";

const Footer = () => {
  return (
    <footer class="bg-dark text-center text-white">
      <div className="d-flex justify-content-center p-3">
        Thank you for visiting my website
      </div>
      <div class="container pb-0">
        <section class="mb-4">
          <a
            class="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#3b5998" }}
            href="https://www.facebook.com/TadaNNT/"
            role="button"
          >
            <i class="fab fa-facebook-f"></i>
          </a>

          <a
            class="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#55acee" }}
            href="/"
            role="button"
          >
            <i class="fab fa-twitter"></i>
          </a>

          <a
            class="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#dd4b39" }}
            href="/"
            role="button"
          >
            <i class="fab fa-google"></i>
          </a>

          <a
            class="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#ac2bac" }}
            href="/"
            role="button"
          >
            <i class="fab fa-instagram"></i>
          </a>

          <a
            class="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#0082ca" }}
            href="/"
            role="button"
          >
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a
            class="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#333333" }}
            href="/"
            role="button"
          >
            <i class="fab fa-github"></i>
          </a>
        </section>
      </div>

      <div
        class="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2020 Copyright:
        <a class="text-white" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
