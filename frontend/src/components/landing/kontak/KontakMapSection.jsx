export default function KontakMapSection() {
  return (
    <section className="w-full h-[450px] relative border-t border-yen-accent/15 px-6 md:px-12 py-1 mt-15">
      <div className="w-full h-full rounded-[28px] border-2 border-yen-cream overflow-hidden shadow-[0_8px_30px_rgba(30,27,26,0.06)]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5951660440955!2d107.60981131085353!3d-6.938890793032152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6177b94921f%3A0xe1043c7b94cf931b!2sMie%20%26%20Baso%20Yen!5e0!3m2!1sen!2sid!4v1716185854082!5m2!1sen!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Baso Yen Factory Map"
        />
      </div>
    </section>
  );
}
