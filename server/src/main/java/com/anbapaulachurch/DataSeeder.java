package com.anbapaulachurch;

import com.anbapaulachurch.entity.CouncilMember;
import com.anbapaulachurch.entity.Father;
import com.anbapaulachurch.entity.FatherSchedule;
import com.anbapaulachurch.entity.MassSchedule;
import com.anbapaulachurch.entity.Service;
import com.anbapaulachurch.entity.SiteSetting;
import com.anbapaulachurch.entity.TickerItem;
import com.anbapaulachurch.repository.CouncilMemberRepository;
import com.anbapaulachurch.repository.FatherRepository;
import com.anbapaulachurch.repository.FatherScheduleRepository;
import com.anbapaulachurch.repository.MassScheduleRepository;
import com.anbapaulachurch.repository.ServiceRepository;
import com.anbapaulachurch.repository.SiteSettingRepository;
import com.anbapaulachurch.repository.TickerItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Order(2)
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final MassScheduleRepository massScheduleRepository;
    private final ServiceRepository serviceRepository;
    private final SiteSettingRepository siteSettingRepository;
    private final TickerItemRepository tickerItemRepository;
    private final CouncilMemberRepository councilMemberRepository;
    private final FatherRepository fatherRepository;
    private final FatherScheduleRepository fatherScheduleRepository;

    @Override
    public void run(String... args) {
        seedMassSchedules();
        seedServices();
        seedSettings();
        seedTicker();
        seedCouncilMembers();
        seedFathers();
        seedFatherSchedules();
    }

    private void seedMassSchedules() {
        if (massScheduleRepository.count() > 0) return;
        List<MassSchedule> schedules = List.of(
            schedule("الجمعة",               "٦:٠٠ - ٨:٠٠ صباحاً",              1),
            schedule("الجمعة",               "٨:٠٠ - ١٠:٠٠ صباحاً",             2),
            schedule("السبت",                "٦:٠٠ - ٨:٠٠ صباحاً",              3),
            schedule("السبت",                "٨:٠٠ - ١٠:٠٠ صباحاً",             4),
            schedule("الأحد",                "٦:٠٠ - ٨:٠٠ صباحاً",              5),
            schedule("الأحد",                "٨:٠٠ - ١٠:٠٠ صباحاً",             6),
            schedule("الاثنين إلى الخميس",   "٩:٠٠ صباحاً - ١٢:٠٠ ظهراً",      7),
            schedule("الاثنين إلى الخميس",   "١٢:٠٠ - ٢:٠٠ ظهراً",             8)
        );
        massScheduleRepository.saveAll(schedules);
        System.out.println("Seeded mass schedules.");
    }

    private MassSchedule schedule(String day, String time, int order) {
        MassSchedule s = new MassSchedule();
        s.setDay(day);
        s.setTime(time);
        s.setDisplayOrder(order);
        s.setActive(true);
        return s;
    }

    private void seedServices() {
        if (serviceRepository.count() > 0) return;
        List<Service> services = List.of(
            service("youth",        "اجتماع الشباب",             "الخميس 7:30 - 9:30 مساءً",                          "تحت رعاية ابونا انطونيوس",  1),
            service("seniors",      "خدمة المسنين",               "الأربعاء 7:30 - 9:30 مساءً",                        "تحت رعاية ابونا إبراهيم",   2),
            service("women",        "خدمة السيدات",               "الاثنين 6:00 - 8:00 مساءً",                         "تحت رعاية ابونا إبراهيم",   3),
            service("kashafa",      "خدمة كشافة الأنبا بولا",     "الأربعاء 7:30 - 9:30 مساءً",                        "تحت رعاية ابونا إبراهيم",   4),
            service("abosefen",     "خدمة ابو سيفين لاخوة الرب", "الجمعة 7:30 - 9:30 مساءً",                          "تحت رعاية ابونا فيلوباتير", 5),
            service("bible-study",  "درس الكتاب المقدس",          "السبت 7:00 - 8:00 مساءً",                           "تحت رعاية ابونا إرميا",     6),
            service("preparation",  "خدمة إعداد خدام",            "الجمعة 11:00 صباحاً - 1:00 ظهراً",                 "تحت رعاية ابونا إرميا حلمي",7),
            service("school",       "مدرسة الشمامسة",             "الجمعة 12:30 - 1:00 ظهراً",                        "تحت رعاية ابونا إرميا حلمي",8),
            service("random",       "خدمة المناطق العشوائية",     "السبت الثالث من كل شهر 9:30 صباحاً - 1:00 ظهراً", "تحت رعاية ابونا إرميا حلمي",9)
        );
        serviceRepository.saveAll(services);
        System.out.println("Seeded services.");
    }

    private Service service(String slug, String name, String schedule, String supervisor, int order) {
        Service s = new Service();
        s.setSlug(slug);
        s.setName(name);
        s.setSchedule(schedule);
        s.setSupervisor(supervisor);
        s.setDisplayOrder(order);
        s.setActive(true);
        s.setDescription("");
        s.setExtraContent("");
        s.setBannerImage("");
        return s;
    }

    private void seedSettings() {
        if (siteSettingRepository.count() > 0) return;
        List<String[]> defaults = List.of(
            new String[]{"church_name",          "كنيسة الأنبا بولا"},
            new String[]{"church_subtitle",       "الرسول الأول"},
            new String[]{"church_quote",          ""},
            new String[]{"logo_url",              ""},
            new String[]{"phone1",                ""},
            new String[]{"phone2",                ""},
            new String[]{"maps_url",              ""},
            new String[]{"youtube_url",           ""},
            new String[]{"soundcloud_url",        ""},
            new String[]{"youtube_live_url",      ""},
            new String[]{"schedule_page_title",   "مواعيد القداسات"},
            new String[]{"schedule_note",         "في الأعياد والمناسبات الخاصة قد تتغير المواعيد. يرجى متابعة إعلانات الكنيسة."},
            new String[]{"donation_bank_name",    ""},
            new String[]{"donation_account_name", ""},
            new String[]{"donation_account_number",""},
            new String[]{"donation_iban",         ""},
            new String[]{"donation_swift",        ""}
        );
        for (String[] kv : defaults) {
            SiteSetting s = new SiteSetting();
            s.setKey(kv[0]);
            s.setValue(kv[1]);
            siteSettingRepository.save(s);
        }
        System.out.println("Seeded site settings.");
    }

    private void seedTicker() {
        if (tickerItemRepository.count() > 0) return;
        List<String> items = List.of(
            "أهلاً وسهلاً بكم في موقع كنيسة الأنبا بولا",
            "القداسات تُقام يومياً - تابعوا المواعيد",
            "يسعدنا استقبال تبرعاتكم لدعم مشاريع الكنيسة",
            "تابعونا على يوتيوب لمتابعة القداسات مباشرة"
        );
        for (int i = 0; i < items.size(); i++) {
            TickerItem t = new TickerItem();
            t.setContent(items.get(i));
            t.setDisplayOrder(i + 1);
            t.setActive(true);
            tickerItemRepository.save(t);
        }
        System.out.println("Seeded ticker items.");
    }

    private void seedCouncilMembers() {
        if (councilMemberRepository.count() > 0) return;
        List<CouncilMember> members = List.of(
            member("دكتور مجدي إبراهيم إسكندر",  "رئيس مجلس الكنيسة",       "/uploads/magdy.jpeg",  1),
            member("مهندس عماد هنري جبره",         "الشؤون المالية",           "/uploads/emad.jpeg",   2),
            member("مهندس وجيه آمين جندي",         "الشؤون الهندسية",          "/uploads/wageh.jpeg",  3),
            member("المستشار سامح مكرم نصيف",      "رئيس لجنة القانونية",     "/uploads/sameh.jpeg",  4),
            member("دكتور مينا رؤوف فؤاد",         "ممثل الشباب",              "/uploads/mina.jpeg",   5),
            member("استاذ شريف وديع اسعد",          "منسق خدمة الشباب",        "/uploads/sherif.jpeg", 6),
            member("المهندسة مارجو وليم سعيد",     "شؤون المشاريع",            "/uploads/margo.jpeg",  7),
            member("استاذة سعاد مرزوق",             "شؤون السيدات",             "/uploads/soad.jpeg",   8),
            member("استاذة إنجي عاطف صبحي",         "الشؤون الاجتماعية",       "/uploads/engy.jpeg",   9)
        );
        councilMemberRepository.saveAll(members);
        System.out.println("Seeded council members.");
    }

    private CouncilMember member(String name, String role, String image, int order) {
        CouncilMember m = new CouncilMember();
        m.setName(name);
        m.setRole(role);
        m.setImage(image);
        m.setDisplayOrder(order);
        return m;
    }

    private void seedFathers() {
        if (fatherRepository.count() > 0) return;
        List<Father> fathers = List.of(
            father("القمص إبراهيم توفيق",   "/uploads/ft-Ibrahim.jpeg"),
            father("القمص أنطونيوس منير",   "/uploads/ft-anton.jpeg"),
            father("القمص فيلوباتير رمزي",  "/uploads/ft-philo.jpeg"),
            father("القس إرميا حلمي",        "/uploads/ft-Armia.jpeg")
        );
        fatherRepository.saveAll(fathers);
        System.out.println("Seeded fathers.");
    }

    private Father father(String name, String image) {
        Father f = new Father();
        f.setName(name);
        f.setImage(image);
        return f;
    }

    private void seedFatherSchedules() {
        if (fatherScheduleRepository.count() > 0) return;
        List<Father> fathers = fatherRepository.findAll();
        if (fathers.size() < 4) return;

        Father ibrahim  = fathers.get(0);
        Father antonios = fathers.get(1);
        Father philo    = fathers.get(2);
        Father armia    = fathers.get(3);

        List<FatherSchedule> schedules = new ArrayList<>();

        // Ibrahim
        schedules.add(sched(ibrahim, "CONFESSION", "الجمعة",   "6:00 - 8:00 م",       "الكنيسة",               null, null));
        schedules.add(sched(ibrahim, "CONFESSION", "السبت",    "5:00 - 7:00 م",       "الكنيسة",               null, null));
        schedules.add(sched(ibrahim, "MEETING",    "الأحد",    "5:00 م",              "قاعة الاجتماعات",       null, null));
        schedules.add(sched(ibrahim, "MEETING",    "الأربعاء", "7:00 م",              "قاعة الاجتماعات",       null, null));
        schedules.add(sched(ibrahim, "AVAILABILITY","",        "",                    "",                      null, "اعداد خدام"));
        schedules.add(sched(ibrahim, "AVAILABILITY","",        "",                    "",                      null, "درس كتاب"));

        // Antonios
        schedules.add(sched(antonios, "CONFESSION", "الخميس", "6:00 - 8:00 م",       "الكنيسة",               null, null));
        schedules.add(sched(antonios, "CONFESSION", "الجمعة", "5:00 - 7:00 م",       "الكنيسة",               null, null));
        schedules.add(sched(antonios, "MEETING",    "الثلاثاء","6:00 م",             "قاعة الاجتماعات",       null, null));
        schedules.add(sched(antonios, "MEETING",    "الجمعة", "7:00 م",              "قاعة الاجتماعات",       null, null));
        schedules.add(sched(antonios, "AVAILABILITY","",      "",                    "",                      null, "اعداد خدام"));
        schedules.add(sched(antonios, "AVAILABILITY","",      "",                    "",                      null, "درس كتاب"));

        // Philo
        schedules.add(sched(philo, "CONFESSION", "الأربعاء",  "6:00 - 8:00 م",       "الكنيسة",               null, null));
        schedules.add(sched(philo, "CONFESSION", "السبت",     "4:00 - 6:00 م",       "الكنيسة",               null, null));
        schedules.add(sched(philo, "MEETING",    "الأحد",     "4:00 م",              "قاعة الاجتماعات",       null, null));
        schedules.add(sched(philo, "MEETING",    "الخميس",    "6:30 م",              "قاعة الاجتماعات",       null, null));
        schedules.add(sched(philo, "AVAILABILITY","",         "",                    "",                      null, "اعداد خدام"));
        schedules.add(sched(philo, "AVAILABILITY","",         "",                    "",                      null, "درس كتاب"));

        // Armia
        schedules.add(sched(armia, "CONFESSION", "الاحد",     "صباحا بعد القداس",    "مكتب ابونا بالدور الثالث", null, null));
        schedules.add(sched(armia, "CONFESSION", "الجمعة",    "صباحا بعد القداس",    "مكتب ابونا بالدور الثالث", null, null));
        schedules.add(sched(armia, "MEETING",    "السبت",     "6:00 م - 7:00 م",     "كنيسة البابا كيرلس",    "عشية",      null));
        schedules.add(sched(armia, "MEETING",    "السبت",     "7:00 م - 8:00 م",     "كنيسة البابا كيرلس",    "درس كتاب", null));
        schedules.add(sched(armia, "AVAILABILITY","",         "",                    "",                      null, "اعداد خدام"));
        schedules.add(sched(armia, "AVAILABILITY","",         "",                    "",                      null, "مناطق عشوائية"));

        fatherScheduleRepository.saveAll(schedules);
        System.out.println("Seeded father schedules.");
    }

    private FatherSchedule sched(Father father, String type, String day, String time, String location, String meetingType, String service) {
        FatherSchedule s = new FatherSchedule();
        s.setFather(father);
        s.setType(type);
        s.setDay(day);
        s.setTime(time);
        s.setLocation(location);
        s.setMeetingType(meetingType);
        s.setService(service);
        return s;
    }
}
