import { GovernmentScheme, SchemeCategory } from './types';

export const VERIFIED_SCHEMES: GovernmentScheme[] = [
  {
    id: 'kmut_scheme',
    name: 'கலைஞர் மகளிர் உரிமைத் திட்டம்',
    nameEn: 'Kalaignar Magalir Urimai Thittam (KMUT)',
    badge: 'மாதாந்திர ₹1,000 உரிமைத் தொகை',
    badgeEn: 'Monthly ₹1,000 Direct Support',
    category: 'financial_support',
    purpose: 'தமிழ்நாட்டிலுள்ள குடும்பத் தலைவிகளுக்கு மாதந்தோறும் ₹1,000 உரிமைத் தொகையாக வழங்கி பெண்களின் பொருளாதார சுதந்திரத்தை உறுதி செய்யும் தமிழ்நாடு அரசின் முன்னோடி திட்டம்.',
    purposeEn: 'Monthly financial assistance of ₹1,000 deposited directly into bank accounts of eligible women heads of families in Tamil Nadu.',
    benefitAmount: 'மாதம் ₹1,000 (ஆண்டுக்கு ₹12,000)',
    benefitAmountEn: '₹1,000 per month (₹12,000 / year)',
    department: 'சிறப்பு திட்ட செயலாக்கத் துறை, தமிழ்நாடு அரசு',
    departmentEn: 'Special Programme Implementation Dept, Govt of Tamil Nadu',
    stateOrRegion: 'Tamil Nadu',
    officialUrl: 'https://kmut.tn.gov.in',
    helpline: '1100',
    targetBeneficiary: 'குடும்பத் தலைவிகள் (21 வயது மற்றும் அதற்கு மேல்)',
    targetBeneficiaryEn: 'Women heads of families aged 21 and above',
    sourceReference: 'Govt of Tamil Nadu G.O. (Ms) No. 42 Special Programme Implementation Dept',
    lastVerifiedDate: '2026-09-15',
    isVerifiedOfficial: true,
    eligibilityCriteria: [
      {
        id: 'age',
        question: 'உங்கள் வயது என்ன? (குறைந்தபட்சம் 21 வயது பூர்த்தியாகியிருக்க வேண்டும்)',
        questionEn: 'What is your age? (Must be at least 21 years old)',
        shortLabel: 'வயது 21+',
        shortLabelEn: 'Age 21+',
        type: 'number',
        explanationIfMet: '21 வயது அல்லது அதற்கு மேல் உள்ள குடும்பத் தலைவிகள் இதற்கு தகுதியானவர்கள்.',
        explanationIfMetEn: 'Women heads of families aged 21 and above qualify.',
        explanationIfNotMet: '21 வயது நிறைவடையாதவர்கள் இதற்கு விண்ணப்பிக்க முடியாது.',
        explanationIfNotMetEn: 'Applicant must be at least 21 years of age.'
      },
      {
        id: 'family_head',
        question: 'குடும்ப அட்டை (Smart Ration Card)-ல் உங்கள் பெயர் குடும்பத் தலைவியாக அல்லது மனைவியாக உள்ளதா?',
        questionEn: 'Are you listed as the woman head of the family or spouse in the Smart Ration Card?',
        shortLabel: 'குடும்பத் தலைவி நிலை',
        shortLabelEn: 'Head of Family status',
        type: 'boolean',
        explanationIfMet: 'குடும்ப அட்டையில் உள்ள குடும்பத் தலைவிக்கு மட்டுமே இத்தொகை கிடைக்கும்.',
        explanationIfMetEn: 'The woman head of family registered on the ration card is eligible.',
        explanationIfNotMet: 'குடும்ப அட்டையில் பெண் குடும்பத் தலைவியாக இருக்க வேண்டும் அல்லது குடும்பத்தின் மூத்த பெண்ணாக இருக்க வேண்டும்.',
        explanationIfNotMetEn: 'Must be designated as the woman head or senior woman on the card.'
      },
      {
        id: 'annual_income',
        question: 'உங்கள் குடும்பத்தின் மொத்த ஆண்டு வருமானம் ₹2.5 லட்சத்திற்குள் உள்ளதா?',
        questionEn: 'Is your total annual household income less than ₹2.5 Lakhs?',
        shortLabel: 'வருமானம் ₹2.5 லட்சத்திற்குள்',
        shortLabelEn: 'Income under ₹2.5 Lakhs',
        type: 'boolean',
        explanationIfMet: 'ஆண்டு வருமானம் ₹2.5 லட்சத்திற்கு குறைவாக இருப்பதால் பொருளாதார ரீதியாக தகுதி பெறுகிறீர்கள்.',
        explanationIfMetEn: 'Annual family income under ₹2.5 Lakhs meets the financial criteria.',
        explanationIfNotMet: 'ஆண்டு வருமானம் ₹2.5 லட்சத்திற்கு மேல் உள்ள குடும்பங்கள் இத்திட்டத்தில் சேர முடியாது.',
        explanationIfNotMetEn: 'Income exceeds ₹2.5 Lakhs ceiling limit.'
      },
      {
        id: 'eb_consumption',
        question: 'உங்கள் வீட்டில் ஆண்டு மின்சார பயன்பாடு 3,600 யூனிட்டுக்குள் உள்ளதா? (மாதம் தோராயமாக 300 யூனிட்)',
        questionEn: 'Is your annual domestic electricity consumption within 3,600 units (approx. 300 units/month)?',
        shortLabel: 'மின் பயன்பாடு 3600 யூனிட்',
        shortLabelEn: 'EB within 3,600 units',
        type: 'boolean',
        explanationIfMet: 'மின்சார பயன்பாட்டு வரம்பு அரசு விதிகளுக்குள் உள்ளது.',
        explanationIfMetEn: 'Electricity consumption is within the stipulated threshold.',
        explanationIfNotMet: 'ஆண்டுக்கு 3,600 யூனிட்டுக்கு மேல் மின்சாரம் பயன்படுத்தினால் தகுதி இல்லை.',
        explanationIfNotMetEn: 'Electricity consumption exceeds allowed ceiling.'
      }
    ],
    documents: [
      {
        id: 'ration_card',
        name: 'ஸ்மார்ட் குடும்ப அட்டை (Smart Ration Card)',
        nameEn: 'Smart Ration Card',
        description: 'குடும்ப உறுப்பினர்கள் மற்றும் உங்கள் பெயர் உள்ள ரேஷன் கார்டு அசல் அல்லது நகல்.',
        descriptionEn: 'Original or copy of Smart Family Card showing family members.',
        sampleTips: 'கார்டின் முன்பக்கம் மற்றும் குடும்பத்தலைவி பெயர் தெளிவாக தெரிய வேண்டும்.',
        sampleTipsEn: 'Ensure woman head of family name and card number are clearly visible.',
        isMandatory: true
      },
      {
        id: 'aadhaar_card',
        name: 'விண்ணப்பதாரரின் ஆதார் அட்டை (Aadhaar Card)',
        nameEn: 'Aadhaar Card of Applicant',
        description: 'உங்கள் 12 இலக்க ஆதார் அட்டை.',
        descriptionEn: 'Your 12-digit Aadhaar Card.',
        sampleTips: 'ஆதார் அட்டையின் பெயர் மற்றும் பிறந்த தேதி சரியாக இருக்க வேண்டும்.',
        sampleTipsEn: 'Name and DOB should match bank records.',
        isMandatory: true
      },
      {
        id: 'bank_passbook',
        name: 'வங்கி கணக்கு புத்தகம் (Aadhaar Linked Bank Passbook)',
        nameEn: 'Bank Passbook (Aadhaar Linked)',
        description: 'விண்ணப்பதாரர் பெயரில் உள்ள வங்கிக் கணக்கு மற்றும் ஆதார் இணைக்கப்பட்டிருக்க வேண்டும்.',
        descriptionEn: 'Bank account in woman’s name, seeded with Aadhaar for DBT.',
        sampleTips: 'கணக்கு எண், IFSC குறியீடு, வங்கி பெயர் தெளிவாக உள்ள முதல் பக்கம்.',
        sampleTipsEn: 'Account number and IFSC code page.',
        isMandatory: true
      },
      {
        id: 'eb_receipt',
        name: 'மின் நுகர்வோர் எண் / மின் கட்டண ரசீது',
        nameEn: 'Electricity Consumer Number / EB Bill',
        description: 'வீட்டு மின் இணைப்பு எண் அட்டை அல்லது சமீபத்திய கட்டண ரசீது.',
        descriptionEn: 'Domestic EB connection number card or recent receipt.',
        sampleTips: 'மின் நுகர்வோர் அட்டை எண் அல்லது TANGEDCO ரசீது எண்.',
        sampleTipsEn: 'EB consumer number card.',
        isMandatory: false,
        alternative: 'மின் நுகர்வோர் எண் தெரிந்தால் போதுமானது.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'ஆவணங்களை கையில் தயார் செய்து கொள்ளவும்',
        titleEn: 'Keep Documents Ready',
        description: 'ரேஷன் அட்டை, ஆதார் அட்டை, மற்றும் ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்கு புத்தகத்தை எடுத்துக் கொள்ளுங்கள்.',
        descriptionEn: 'Collect your Smart Ration Card, Aadhaar Card, and Bank Passbook.'
      },
      {
        stepNumber: 2,
        title: 'வங்கி கணக்கில் ஆதார் இணைப்பை சரிபார்க்கவும் (DBT Seeding)',
        titleEn: 'Verify Bank Aadhaar Seeding',
        description: 'உங்கள் வங்கிக் கணக்குடன் ஆதார் எண் இணைக்கப்பட்டு நேரடிப் பணப் பரிமாற்றம் (DBT) இயக்கத்தில் உள்ளதா என வங்கியில் சரிபார்க்கவும்.',
        descriptionEn: 'Ensure Aadhaar is linked and DBT (Direct Benefit Transfer) is active in your bank.'
      },
      {
        stepNumber: 3,
        title: 'இ-சேவை மையம் அல்லது சிறப்பு முகாமில் விண்ணப்பிக்கவும்',
        titleEn: 'Apply via e-Sevai or Camp',
        description: 'உங்கள் கிராம நிர்வாக அலுவலகம், ஊராட்சி மன்ற அலுவலகம் அல்லது அருகிலுள்ள அரசு இ-சேவை மையத்தில் கைரேகை பதிவு செய்து விண்ணப்பிக்கலாம்.',
        descriptionEn: 'Register biometric details at your local government e-Sevai centre or camp.'
      },
      {
        stepNumber: 4,
        title: 'விண்ணப்ப ஏற்பு & மாதாந்திர பணம் வரவு',
        titleEn: 'Confirmation & Monthly Deposit',
        description: 'விண்ணப்பம் ஏற்கப்பட்டதும் உங்கள் அலைபேசிக்கு SMS வரும். ஒவ்வொரு மாதமும் 15-ஆம் தேதி ₹1,000 வங்கி கணக்கில் நேரடியாக வரவு வைக்கப்படும்.',
        descriptionEn: 'Confirmation SMS sent to mobile; ₹1,000 credited on the 15th of every month.'
      }
    ],
    faq: [
      {
        qTa: 'எனக்கு சொந்த வீடு இல்லை, வாடகை வீட்டில் வசிக்கிறேன். நான் விண்ணப்பிக்கலாமா?',
        qEn: 'I live in a rented house. Can I apply?',
        aTa: 'ஆம், கண்டிப்பாக விண்ணப்பிக்கலாம். வாடகை வீட்டில் வசிப்பவர்களும் குடும்ப அட்டை அடிப்படையில் தகுதியுடையவர்களே.',
        aEn: 'Yes, women living in rented houses are fully eligible based on their ration card.'
      },
      {
        qTa: 'விண்ணப்பத்திற்கு கட்டணம் செலுத்த வேண்டுமா?',
        qEn: 'Is there any fee to apply?',
        aTa: 'இல்லை, கலைஞர் மகளிர் உரிமைத் திட்டத்திற்கு விண்ணப்பிப்பது முற்றிலும் இலவசம். யாரிடமும் பணம் கொடுக்க வேண்டாம்.',
        aEn: 'No, applying is 100% free. Never pay anyone any fee.'
      }
    ]
  },
  {
    id: 'pudhumai_penn',
    name: 'புதுமைப் பெண் திட்டம் (மூவலூர் ராமாமிர்தம் உயர்கல்வி உறுதி)',
    nameEn: 'Pudhumai Penn Scheme (Higher Education Assurance)',
    badge: 'மாணவிகளுக்கு மாதம் ₹1,000',
    badgeEn: '₹1,000/month for Girl Students',
    category: 'higher_education',
    purpose: 'அரசுப் பள்ளிகளில் 6 முதல் 12-ஆம் வகுப்பு வரை பயின்று உயர்கல்வி (பட்டப்படிப்பு, பாலிடெக்னிக், ITI) படிக்கும் மாணவிகளுக்கு மாதம் ₹1,000 உதவித்தொகை வழங்கும் திட்டம்.',
    purposeEn: 'Financial assistance of ₹1,000 every month for female students who studied classes 6 to 12 in Tamil Nadu government schools pursuing higher education.',
    benefitAmount: 'மாதம் ₹1,000 (படிப்பு முடியும் வரை)',
    benefitAmountEn: '₹1,000 per month (until degree completion)',
    department: 'சமூக நலன் மற்றும் மகளிர் உரிமைத் துறை, தமிழ்நாடு அரசு',
    departmentEn: 'Social Welfare and Women Empowerment Dept, Govt of Tamil Nadu',
    stateOrRegion: 'Tamil Nadu',
    officialUrl: 'https://pudhumaipenn.tn.gov.in',
    helpline: '14417',
    targetBeneficiary: 'அரசுப் பள்ளியில் படித்த பெண் கல்லூரி மாணவிகள்',
    targetBeneficiaryEn: 'Female students pursuing higher education who studied in Govt schools',
    sourceReference: 'Social Welfare & Women Empowerment Dept Official Portal',
    lastVerifiedDate: '2026-09-20',
    isVerifiedOfficial: true,
    eligibilityCriteria: [
      {
        id: 'govt_school',
        question: 'நீங்கள் தமிழ்நாட்டில் 6-ஆம் வகுப்பு முதல் 12-ஆம் வகுப்பு வரை அரசுப் பள்ளியில் படித்தவரா?',
        questionEn: 'Did you study from classes 6 to 12 in Tamil Nadu Government schools?',
        shortLabel: '6-12 அரசுப் பள்ளி படிப்பு',
        shortLabelEn: 'Classes 6-12 in Govt School',
        type: 'boolean',
        explanationIfMet: 'அரசுப் பள்ளியில் 6 முதல் 12 வரை படித்த மாணவிகளுக்கு முழு தகுதி உண்டு.',
        explanationIfMetEn: 'Girls who studied in government schools for classes 6-12 qualify.',
        explanationIfNotMet: 'தனியார் பள்ளிகளில் படித்தவர்களுக்கு இத்திட்டம் பொருந்தாது.',
        explanationIfNotMetEn: 'Students from private schools are not covered under this specific scheme.'
      },
      {
        id: 'higher_edu',
        question: 'நீங்கள் தற்போது அங்கீகரிக்கப்பட்ட கல்லூரி, பாலிடெக்னிக் அல்லது ITI-யில் படிக்கிறீர்களா?',
        questionEn: 'Are you currently enrolled in a recognized college, polytechnic, or ITI?',
        shortLabel: 'உயர்கல்வி சேர்க்கை',
        shortLabelEn: 'Higher Education Enrolled',
        type: 'boolean',
        explanationIfMet: 'பட்டப்படிப்பு அல்லது தொழிற்கல்வி பயிலும் மாணவிகளுக்கு இத்தொகை கிடைக்கும்.',
        explanationIfMetEn: 'Enrolled in higher education degree/diploma.',
        explanationIfNotMet: 'தற்போது கல்லூரியில் பயிலும் மாணவிகளுக்கு மட்டுமே இத்திட்டம் பொருந்தும்.',
        explanationIfNotMetEn: 'Must be actively studying in higher education.'
      }
    ],
    documents: [
      {
        id: 'school_tc',
        name: 'பள்ளி மாற்றுச் சான்றிதழ் (School TC) / EMIS எண்',
        nameEn: 'School Transfer Certificate / EMIS Number',
        description: '6 முதல் 12 வரை அரசுப் பள்ளியில் படித்ததற்கான மாற்றுச் சான்றிதழ் அல்லது தலைமை ஆசிரியர் சான்று.',
        descriptionEn: 'TC proving 6th to 12th study in Govt schools or EMIS student ID.',
        sampleTips: 'பள்ளி முத்திரை மற்றும் படித்து முடித்த ஆண்டுகள் தெளிவாக இருக்க வேண்டும்.',
        sampleTipsEn: 'School seal and years of study must be visible.',
        isMandatory: true
      },
      {
        id: 'bonafide_cert',
        name: 'கல்லூரி போனாஃபைட் சான்றிதழ் (Bonafide Certificate)',
        nameEn: 'College Bonafide Certificate',
        description: 'தற்போது கல்லூரியில் படித்துக் கொண்டிருப்பதற்கான கல்லூரி முதல்வர் சான்றிதழ்.',
        descriptionEn: 'Bonafide certificate issued by current college Principal.',
        sampleTips: 'நடப்பு கல்வியாண்டு மற்றும் படிக்கும் பிரிவு குறிப்பிடப்பட்டிருக்க வேண்டும்.',
        sampleTipsEn: 'Current academic year details.',
        isMandatory: true
      },
      {
        id: 'bank_passbook_student',
        name: 'மாணவியின் சொந்த வங்கிக் கணக்கு புத்தகம்',
        nameEn: 'Student Bank Account Passbook',
        description: 'மாணவியின் பெயரிலேயே தனியாக உள்ள வங்கிக் கணக்கு.',
        descriptionEn: 'Individual bank passbook in the girl student’s name.',
        sampleTips: 'பெற்றோர் இணைந்த கணக்கு அல்லாது மாணவியின் தனி கணக்காக இருக்க வேண்டும்.',
        sampleTipsEn: 'Should be a single account in student’s name.',
        isMandatory: true
      },
      {
        id: 'aadhaar_student',
        name: 'மாணவியின் ஆதார் அட்டை',
        nameEn: 'Student Aadhaar Card',
        description: 'மாணவியின் 12 இலக்க ஆதார் அட்டை.',
        descriptionEn: 'Student’s 12-digit Aadhaar card.',
        sampleTips: 'ஆதாரில் உள்ள பெயர் பள்ளிக் கல்விச் சான்றிதழுடன் ஒத்திருக்க வேண்டும்.',
        sampleTipsEn: 'Name should match school records.',
        isMandatory: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'கல்லூரி ஒருங்கிணைப்பாளரை (Nodal Officer) அணுகவும்',
        titleEn: 'Contact College Nodal Officer',
        description: 'உங்கள் கல்லூரியில் உள்ள புதுமைப் பெண் திட்ட பொறுப்பு ஆசிரியரிடம் உங்கள் ஆவணங்களை சமர்ப்பிக்கவும்.',
        descriptionEn: 'Submit your details to the designated Nodal Officer in your college.'
      },
      {
        stepNumber: 2,
        title: 'EMIS மற்றும் ஆதார் சரிபார்ப்பு',
        titleEn: 'EMIS & Aadhaar Verification',
        description: 'கல்லூரியே உங்களை புதுமைப் பெண் போர்ட்டலில் பதிவு செய்து உங்கள் பள்ளி EMIS எண்ணை சரிபார்க்கும்.',
        descriptionEn: 'College registers your student record and validates government school credentials.'
      },
      {
        stepNumber: 3,
        title: 'மாதாந்திர ₹1,000 வங்கிக் கணக்கில் வரவு',
        titleEn: 'Monthly ₹1,000 Credit',
        description: 'சரிபார்ப்பு முடிந்ததும் உங்கள் வங்கிக் கணக்கில் ஒவ்வொரு மாதமும் ₹1,000 நேரடியாக வந்து சேரும்.',
        descriptionEn: 'Amount is deposited directly to your bank account every month.'
      }
    ],
    faq: [
      {
        qTa: 'நான் தொலைதூரக் கல்வி (Distance Education) படிக்கிறேன். எனக்கு இத்திட்டம் கிடைக்குமா?',
        qEn: 'I study in correspondence/distance education. Am I eligible?',
        aTa: 'இல்லை, முழுநேர (Regular) கல்லூரிகளில் பயிலும் அரசுப் பள்ளி மாணவிகளுக்கு மட்டுமே இத்திட்டம் பொருந்தும்.',
        aEn: 'No, this scheme is valid only for regular full-time enrolled students.'
      }
    ]
  },
  {
    id: 'free_sewing_machine',
    name: 'சத்யவாணி முத்து அம்மையார் நினைவு இலவச தையல் இயந்திரம்',
    nameEn: 'Free Sewing Machine Scheme (Sathyavani Muthu Ammaiyar)',
    badge: 'சுயதொழில் இலவச தையல் இயந்திரம்',
    badgeEn: 'Free Machine for Self-Employment',
    category: 'self_employment',
    purpose: 'ஏழைப் பெண்கள், விதவைகள், கணவனால் கைவிடப்பட்ட பெண்கள் மற்றும் மாற்றுத்திறனாளி பெண்களுக்கு சுயதொழில் தொடங்க இலவசமாக தையல் இயந்திரம் வழங்கும் தமிழ்நாடு அரசு திட்டம்.',
    purposeEn: 'Supply of free motorized/manual sewing machines to destitute widows, deserted wives, differently-abled, and economically disadvantaged women for self-employment.',
    benefitAmount: 'இலவச தையல் இயந்திரம் (மதிப்பு ₹8,000+)',
    benefitAmountEn: 'Free Sewing Machine (Value ₹8,000+)',
    department: 'சமூக நலத் துறை, தமிழ்நாடு அரசு',
    departmentEn: 'Social Welfare Department, Govt of Tamil Nadu',
    stateOrRegion: 'Tamil Nadu',
    officialUrl: 'https://www.tn.gov.in/scheme/data_view/44299',
    helpline: '181',
    targetBeneficiary: 'தையல் தெரிந்த ஏழைப் பெண்கள், விதவைகள், ஆதரவற்ற பெண்கள் (20-40 வயது)',
    targetBeneficiaryEn: 'Women with tailoring skills, widows, deserted women (20-40 yrs)',
    sourceReference: 'TN Social Welfare Citizen Charter Notification',
    lastVerifiedDate: '2026-08-10',
    isVerifiedOfficial: true,
    eligibilityCriteria: [
      {
        id: 'age_sewing',
        question: 'உங்கள் வயது 20 முதல் 40 வயதிற்குள் உள்ளதா?',
        questionEn: 'Is your age between 20 and 40 years?',
        shortLabel: 'வயது 20-40',
        shortLabelEn: 'Age 20-40',
        type: 'boolean',
        explanationIfMet: 'வயது வரம்பிற்குள் உள்ளீர்கள்.',
        explanationIfMetEn: 'Age is within the qualifying range (20-40 years).',
        explanationIfNotMet: '20 முதல் 40 வயதுக்குட்பட்ட பெண்களுக்கு முன்னுரிமை அளிக்கப்படுகிறது.',
        explanationIfNotMetEn: 'Age must be between 20 and 40.'
      },
      {
        id: 'tailoring_skill',
        question: 'உங்களுக்கு தையல் தைக்கத் தெரியுமா மற்றும் தையல் பயிற்சி சான்றிதழ் உள்ளதா?',
        questionEn: 'Do you know tailoring and possess a basic tailoring course certificate?',
        shortLabel: 'தையல் பயிற்சி சான்று',
        shortLabelEn: 'Tailoring Certificate',
        type: 'boolean',
        explanationIfMet: 'தையல் அறிவு இருப்பதற்கான சான்றிதழ் இருந்தால் விரைவாக பெறலாம்.',
        explanationIfMetEn: 'Tailoring certificate validates your qualification.',
        explanationIfNotMet: 'அங்கீகரிக்கப்பட்ட நிறுவனத்திடமிருந்து குறைந்தபட்சம் 6 மாத தையல் பயிற்சி சான்றிதழ் தேவை.',
        explanationIfNotMetEn: 'Requires at least 6 months tailoring training certificate.'
      },
      {
        id: 'income_sewing',
        question: 'உங்கள் குடும்ப ஆண்டு வருமானம் ₹72,000-க்குள் உள்ளதா?',
        questionEn: 'Is your annual household income less than ₹72,000?',
        shortLabel: 'வருமானம் ₹72,000-க்குள்',
        shortLabelEn: 'Income under ₹72,000',
        type: 'boolean',
        explanationIfMet: 'பொருளாதார வருமான வரம்பிற்குள் உள்ளீர்கள்.',
        explanationIfMetEn: 'Meets income eligibility ceiling for welfare assistance.',
        explanationIfNotMet: 'வருமானம் ₹72,000-க்கு மேல் இருந்தால் விண்ணப்பிக்க முடியாது.',
        explanationIfNotMetEn: 'Income exceeds limit for this welfare scheme.'
      }
    ],
    documents: [
      {
        id: 'tailoring_cert',
        name: 'தையல் பயிற்சி சான்றிதழ் (Tailoring Course Certificate)',
        nameEn: 'Tailoring Training Certificate',
        description: 'குறைந்தபட்சம் 6 மாத தையல் பயிற்சி பெற்றதற்கான சான்றிதழ்.',
        descriptionEn: 'Certificate proving at least 6 months tailoring course completion.',
        sampleTips: 'பயிற்சி பெற்ற நிறுவனத்தின் பெயர், கையொப்பம் மற்றும் முத்திரை இருக்க வேண்டும்.',
        sampleTipsEn: 'Institute seal and trainer signature.',
        isMandatory: true
      },
      {
        id: 'income_cert',
        name: 'வருமானச் சான்றிதழ் (வருமானம் ₹72,000-க்குள்)',
        nameEn: 'Income Certificate (under ₹72,000)',
        description: 'வட்டாட்சியர் (Tahsildar) வழங்கிய நடப்பு ஆண்டு வருமானச் சான்றிதழ்.',
        descriptionEn: 'Income certificate issued by Tahsildar through e-Sevai.',
        sampleTips: 'வருமானச் சான்றிதழ் இணையத்தில் பதிவிறக்கம் செய்த QR குறியீட்டுடன் இருக்க வேண்டும்.',
        sampleTipsEn: 'Digital certificate with QR code.',
        isMandatory: true
      },
      {
        id: 'age_proof',
        name: 'வயது சான்று (School TC / Birth Certificate / 10th Marksheet)',
        nameEn: 'Age Proof (Birth Certificate or TC)',
        description: '20 முதல் 40 வயதிற்குள் இருப்பதற்கான சான்று.',
        descriptionEn: 'Document proving age between 20 and 40.',
        sampleTips: 'பிறந்த தேதி தெளிவாக தெரிய வேண்டும்.',
        sampleTipsEn: 'Clear date of birth.',
        isMandatory: true
      },
      {
        id: 'community_cert',
        name: 'சாதிச் சான்றிதழ் (Community Certificate)',
        nameEn: 'Community Certificate',
        description: 'வட்டாட்சியர் அலுவலகத்தால் வழங்கப்பட்ட சாதிச் சான்றிதழ்.',
        descriptionEn: 'Issued by Revenue Department.',
        sampleTips: 'SC/ST/BC/MBC பிரிவு முன்னுரிமைக்கு உதவும்.',
        sampleTipsEn: 'Used for welfare quota eligibility.',
        isMandatory: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'வருமான சான்றிதழ் & தையல் சான்றிதழை தயார் செய்யவும்',
        titleEn: 'Gather Certificates',
        description: 'இ-சேவை மையம் மூலம் வருமானச் சான்றிதழ் பெற்று, தையல் பயிற்சி சான்றிதழை நகல் எடுக்கவும்.',
        descriptionEn: 'Obtain income certificate and keep tailoring course proof ready.'
      },
      {
        stepNumber: 2,
        title: 'மாவட்ட சமூக நல அலுவலர் (DSWO) அல்லது இ-சேவை மூலம் விண்ணப்பிக்கவும்',
        titleEn: 'Submit Application to DSWO',
        description: 'மாவட்ட ஆட்சியர் அலுவலக வளாகத்தில் உள்ள சமூக நல அலுவலகத்தில் அல்லது இ-சேவை மையத்தில் விண்ணப்பப் படிவத்தை சமர்ப்பிக்கவும்.',
        descriptionEn: 'Submit application at District Social Welfare Office or online via e-Sevai.'
      },
      {
        stepNumber: 3,
        title: 'சமூக நல விரிவாக்க அலுவலர் நேரடி சரிபார்ப்பு',
        titleEn: 'Field Verification',
        description: 'சமூக நல விரிவாக்க அலுவலர் உங்கள் முகவரியை சரிபார்த்து அறிக்கையை சமர்ப்பிப்பார்.',
        descriptionEn: 'Extension officer verifies your residential and skill details.'
      },
      {
        stepNumber: 4,
        title: 'இலவச தையல் இயந்திரம் பெற்றுக்கொள்ளுதல்',
        titleEn: 'Machine Handover',
        description: 'அரசு விழாவில் அல்லது தாலுகா அலுவலகத்தில் தையல் இயந்திரம் இலவசமாக வழங்கப்படும்.',
        descriptionEn: 'Free sewing machine handed over at taluk/district headquarters.'
      }
    ],
    faq: [
      {
        qTa: 'விதவை அல்லது கணவனால் கைவிடப்பட்ட பெண்களுக்கு கூடுதல் முன்னுரிமை உண்டா?',
        qEn: 'Is there special priority for widows or deserted women?',
        aTa: 'ஆம், விதவை அல்லது கணவனால் கைவிடப்பட்ட சான்றிதழ் இணைத்தால் முன்னுரிமை அடிப்படையில் தையல் இயந்திரம் வழங்கப்படும்.',
        aEn: 'Yes, widows and deserted women receive immediate first-priority allocation.'
      }
    ]
  },
  {
    id: 'destitute_widow_pension',
    name: 'ஆதரவற்ற விதவை ஓய்வூதியத் திட்டம் (OAP)',
    nameEn: 'Destitute Widow Pension Scheme (OAP)',
    badge: 'மாதாந்திர ₹1,200 ஓய்வூதியம்',
    badgeEn: 'Monthly ₹1,200 Lifelong Pension',
    category: 'pensions',
    purpose: 'குடும்பத்தை நடத்த வருமானமின்றி அல்லது ஆதரவின்றி வாழும் ஏழை விதவை பெண்களுக்கு மாதம் ₹1,200 அரசு சமூகப் பாதுகாப்பு ஓய்வூதியம் வழங்கும் திட்டம்.',
    purposeEn: 'Monthly financial social security pension of ₹1,200 to destitute widows who have no income or adult earning children to support them.',
    benefitAmount: 'மாதம் ₹1,200 (ஆயுள் முழுவதும்)',
    benefitAmountEn: '₹1,200 per month for life',
    department: 'வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை, தமிழ்நாடு அரசு',
    departmentEn: 'Revenue & Disaster Management Dept, Govt of Tamil Nadu',
    stateOrRegion: 'Tamil Nadu',
    officialUrl: 'https://www.tnesevai.tn.gov.in',
    helpline: '1100',
    targetBeneficiary: 'வருமானமில்லாத விதவை பெண்கள் (18 வயது மற்றும் அதற்கு மேல்)',
    targetBeneficiaryEn: 'Destitute widows aged 18 and above with no earning support',
    sourceReference: 'Revenue Dept Social Security Pension Scheme Guidelines',
    lastVerifiedDate: '2026-09-01',
    isVerifiedOfficial: true,
    eligibilityCriteria: [
      {
        id: 'widow_status',
        question: 'உங்கள் கணவர் இறந்துவிட்டாரா மற்றும் உங்களிடம் கணவரின் இறப்புச் சான்றிதழ் உள்ளதா?',
        questionEn: 'Is your husband deceased and do you have his Death Certificate?',
        shortLabel: 'கணவர் இறப்பு சான்று',
        shortLabelEn: 'Death Certificate',
        type: 'boolean',
        explanationIfMet: 'கணவர் இறப்பு சான்றிதழ் மூலம் ஆதரவற்ற விதவை தகுதி பெறலாம்.',
        explanationIfMetEn: 'Death certificate establishes widow status.',
        explanationIfNotMet: 'இத்திட்டத்திற்கு கணவர் இறப்புச் சான்றிதழ் கட்டாயம் தேவை.',
        explanationIfNotMetEn: 'Death certificate is mandatory.'
      },
      {
        id: 'age_widow',
        question: 'உங்கள் வயது 18 அல்லது அதற்கு மேல் உள்ளதா?',
        questionEn: 'Are you 18 years of age or older?',
        shortLabel: 'வயது 18+',
        shortLabelEn: 'Age 18+',
        type: 'boolean',
        explanationIfMet: '18 வயதுக்கு மேற்பட்ட விதவை பெண்களுக்கு ஓய்வூதியம் கிடைக்கும்.',
        explanationIfMetEn: 'Meets minimum age limit of 18 years.',
        explanationIfNotMet: '18 வயது பூர்த்தியடைந்திருக்க வேண்டும்.',
        explanationIfNotMetEn: 'Must be at least 18 years old.'
      },
      {
        id: 'destitute_cert',
        question: 'உங்களை காப்பாற்ற வயதுக்கு வந்த அல்லது வருமானம் ஈட்டும் மகன்கள் யாரும் இல்லையா?',
        questionEn: 'Do you lack adult earning sons who can support you (living in poverty)?',
        shortLabel: 'ஆதரவற்ற நிலை',
        shortLabelEn: 'Destitute status',
        type: 'boolean',
        explanationIfMet: 'ஆதரவற்ற விதவை நிபந்தனைகள் பூர்த்தியாகின்றன.',
        explanationIfMetEn: 'Qualifies as destitute with no earning adult support.',
        explanationIfNotMet: 'நன்கு சம்பாதிக்கும் மகன்கள் இருந்தால் அரசு விதிகளின்படி தகுதி மாறுபடலாம்.',
        explanationIfNotMetEn: 'May require special assessment if adult sons have income.'
      }
    ],
    documents: [
      {
        id: 'death_cert',
        name: 'கணவரின் இறப்புச் சான்றிதழ் (Husband Death Certificate)',
        nameEn: 'Husband’s Death Certificate',
        description: 'மாநகராட்சி / நகராட்சி / ஊராட்சி வழங்கிய கணவரின் இறப்புச் சான்றிதழ்.',
        descriptionEn: 'Issued by local registrar of births and deaths.',
        sampleTips: 'பதிவு எண் மற்றும் தேதி தெளிவாக இருக்க வேண்டும்.',
        sampleTipsEn: 'Clear registration number and date.',
        isMandatory: true
      },
      {
        id: 'destitute_widow_cert',
        name: 'ஆதரவற்ற விதவைச் சான்றிதழ் (Destitute Widow Certificate)',
        nameEn: 'Destitute Widow Certificate',
        description: 'வட்டாட்சியர் (Tahsildar) அலுவலகத்தால் இ-சேவை மூலம் வழங்கப்படும் சான்றிதழ்.',
        descriptionEn: 'Issued by Tahsildar via e-Sevai portal.',
        sampleTips: 'இ-சேவை மையத்தில் விண்ணப்பித்து 15 நாட்களில் பெறலாம்.',
        sampleTipsEn: 'Can be obtained via e-Sevai within 15 days.',
        isMandatory: true
      },
      {
        id: 'ration_card_widow',
        name: 'ஸ்மார்ட் குடும்ப அட்டை (Ration Card)',
        nameEn: 'Smart Ration Card',
        description: 'உங்கள் முகவரி மற்றும் குடும்ப விவரம் உள்ள ரேஷன் கார்டு.',
        descriptionEn: 'Smart Ration Card showing single/widow status.',
        sampleTips: 'குடும்ப அட்டை நகல்.',
        sampleTipsEn: 'Card photocopy.',
        isMandatory: true
      },
      {
        id: 'bank_passbook_widow',
        name: 'வங்கி அல்லது தபால் நிலைய கணக்கு புத்தகம்',
        nameEn: 'Bank / Post Office Passbook',
        description: 'ஓய்வூதியம் நேரடியாக வரவு வைக்க தனி வங்கி அல்லது தபால் அலுவலக சேமிப்பு கணக்கு.',
        descriptionEn: 'Savings account passbook for direct monthly pension deposit.',
        sampleTips: 'ஆதார் எண் இணைக்கப்பட்டிருக்க வேண்டும்.',
        sampleTipsEn: 'Must be linked with Aadhaar.',
        isMandatory: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'ஆதரவற்ற விதவை சான்றிதழ் பெற இ-சேவையில் விண்ணப்பிக்கவும்',
        titleEn: 'Apply for Destitute Widow Certificate',
        description: 'கணவர் இறப்பு சான்று, குடும்ப அட்டையுடன் இ-சேவை மையம் சென்று விதவை சான்றுக்கு விண்ணப்பிக்கவும்.',
        descriptionEn: 'Apply at nearest e-Sevai centre with death certificate and ration card.'
      },
      {
        stepNumber: 2,
        title: 'கிராம நிர்வாக அலுவலர் (VAO) மற்றும் வருவாய் ஆய்வாளர் (RI) விசாரணை',
        titleEn: 'VAO and RI Verification',
        description: 'உங்கள் கிராம நிர்வாக அலுவலர் மற்றும் வருவாய் ஆய்வாளர் உங்கள் இருப்பிடம் மற்றும் நிலையை சரிபார்ப்பார்கள்.',
        descriptionEn: 'Field verification conducted by Village Administrative Officer and Revenue Inspector.'
      },
      {
        stepNumber: 3,
        title: 'ஓய்வூதிய விண்ணப்பம் சமர்ப்பித்தல்',
        titleEn: 'Submit Pension Application',
        description: 'சான்றிதழ் வந்ததும் சமூகப் பாதுகாப்பு திட்ட ஓய்வூதியத்திற்கு இ-சேவை மூலம் விண்ணப்பிக்கவும்.',
        descriptionEn: 'Apply for Social Security Pension online with the issued certificate.'
      },
      {
        stepNumber: 4,
        title: 'மாதாந்திர ₹1,200 ஓய்வூதியம் வரவு',
        titleEn: 'Monthly Pension Credit',
        description: 'வட்டாட்சியர் ஒப்புதலுக்குப் பின் உங்கள் வங்கி கணக்கில் அல்லது அஞ்சல் கணக்கில் மாதம் ₹1,200 வந்து சேரும்.',
        descriptionEn: '₹1,200 credited directly every month to bank or postal account.'
      }
    ],
    faq: [
      {
        qTa: 'ஓய்வூதிய பணத்தை தபால் நிலைய சேமிப்புக் கணக்கில் பெற முடியுமா?',
        qEn: 'Can I receive the pension in a Post Office savings account?',
        aTa: 'ஆம், இந்திய தபால் அலுவலகம் (India Post Payments Bank) மூலமும் நேரடியாக கிராமத்திலேயே தபால்காரர் மூலம் கைரேகை வைத்து பணத்தை பெறலாம்.',
        aEn: 'Yes, doorstep pension withdrawal via India Post micro-ATM is fully supported.'
      }
    ]
  },
  {
    id: 'matru_vandana',
    name: 'பிரதம மந்திரி மாத்ரு வந்தனா யோஜனா (PMMVY)',
    nameEn: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    badge: 'கர்ப்பிணி பெண்களுக்கு ₹5,000 - ₹6,000 உதவி',
    badgeEn: 'Maternity Support ₹5,000 - ₹6,000',
    category: 'maternal_health',
    purpose: 'கர்ப்பிணி மற்றும் பாலூட்டும் தாய்மார்களுக்கு ஊட்டச்சத்து மற்றும் ஆரோக்கிய பாதுகாப்பிற்காக வழங்கப்படும் நேரடி நிதி உதவித் திட்டம்.',
    purposeEn: 'Direct maternity cash incentive to pregnant women and lactating mothers for improved nutrition and health during child delivery.',
    benefitAmount: '₹5,000 (முதல் குழந்தைக்கு) / ₹6,000 (இரண்டாவது பெண் குழந்தைக்கு)',
    benefitAmountEn: '₹5,000 for 1st child / ₹6,000 for 2nd girl child',
    department: 'பெண்கள் மற்றும் குழந்தைகள் மேம்பாட்டு அமைச்சகம்',
    departmentEn: 'Ministry of Women & Child Development',
    stateOrRegion: 'All India / Tamil Nadu',
    officialUrl: 'https://pmmvy.wcd.gov.in',
    helpline: '104',
    targetBeneficiary: 'கர்ப்பிணி பெண்கள் மற்றும் பாலூட்டும் தாய்மார்கள்',
    targetBeneficiaryEn: 'Pregnant and lactating mothers (19+ years)',
    sourceReference: 'Ministry of Women and Child Development National Portal',
    lastVerifiedDate: '2026-09-10',
    isVerifiedOfficial: true,
    eligibilityCriteria: [
      {
        id: 'pregnant_or_lactating',
        question: 'நீங்கள் தற்போது கர்ப்பமாக உள்ளீர்களா அல்லது சமீபத்தில் குழந்தை பிறந்துள்ளதா?',
        questionEn: 'Are you currently pregnant or have you recently given birth?',
        shortLabel: 'கர்ப்பிணி / பாலூட்டும் தாய்',
        shortLabelEn: 'Pregnant/Lactating Mother',
        type: 'boolean',
        explanationIfMet: 'கர்ப்பிணி மற்றும் தாய்மார்களுக்கு உரிய தவணை நிதி கிடைக்கும்.',
        explanationIfMetEn: 'Qualifies for maternity incentive installments.',
        explanationIfNotMet: 'கர்ப்பிணி அல்லது தாய்மார்களுக்கான திட்டம் இது.',
        explanationIfNotMetEn: 'Designed specifically for pregnant women & new mothers.'
      },
      {
        id: 'anganwadi_reg',
        question: 'அருகிலுள்ள அங்கன்வாடி மையம் அல்லது ஆரம்ப சுகாதார நிலையத்தில் தாய்-சேய் நல அட்டை (RCH/PICME) பெற்றுள்ளீர்களா?',
        questionEn: 'Have you registered at the Anganwadi / Primary Health Centre with RCH / PICME number?',
        shortLabel: 'PICME / தாய்-சேய் அட்டை',
        shortLabelEn: 'PICME Registration',
        type: 'boolean',
        explanationIfMet: 'PICME எண் மற்றும் தாய்-சேய் அட்டை இருந்தால் பணம் உடனடியாக வங்கியில் சேரும்.',
        explanationIfMetEn: 'PICME registration enables automatic direct benefit transfer.',
        explanationIfNotMet: 'கிராம செவிலியர் (VHN) அல்லது அங்கன்வாடி டீச்சரிடம் சென்று தாய்-சேய் அட்டை பெற வேண்டும்.',
        explanationIfNotMetEn: 'Must register with local Village Health Nurse for PICME number.'
      }
    ],
    documents: [
      {
        id: 'mcp_card',
        name: 'தாய்-சேய் நலப் பாதுகாப்பு அட்டை (MCP / RCH Card)',
        nameEn: 'Mother-Child Protection Card (MCP Card)',
        description: 'அரசு ஆரம்ப சுகாதார நிலையம் அல்லது கிராம செவிலியர் வழங்கிய அட்டை.',
        descriptionEn: 'Issued by Primary Health Centre / Village Health Nurse.',
        sampleTips: 'PICME 12 இலக்க பதிவு எண் தெளிவாக இருக்க வேண்டும்.',
        sampleTipsEn: '12-digit PICME number must be visible.',
        isMandatory: true
      },
      {
        id: 'aadhaar_both',
        name: 'தாய் மற்றும் கணவரின் ஆதார் அட்டை',
        nameEn: 'Aadhaar Card of Mother and Husband',
        description: 'கர்ப்பிணி பெண்ணின் ஆதார் அட்டை மற்றும் கணவரின் ஆதார் நகல்.',
        descriptionEn: 'Aadhaar card copy of mother and spouse.',
        sampleTips: 'பெயர் மற்றும் முகவரி பொருந்த வேண்டும்.',
        sampleTipsEn: 'Address match verification.',
        isMandatory: true
      },
      {
        id: 'bank_mcp',
        name: 'தாயின் ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்கு புத்தகம்',
        nameEn: 'Mother’s Bank Account Passbook',
        description: 'கர்ப்பிணி பெண்ணின் பெயரில் உள்ள வங்கி கணக்கு புத்தகம்.',
        descriptionEn: 'Single bank account in mother’s name.',
        sampleTips: 'வங்கி கணக்கில் ஆதார் இணைக்கப்பட்டிருக்க வேண்டும்.',
        sampleTipsEn: 'Must be seeded with Aadhaar.',
        isMandatory: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'அருகிலுள்ள அங்கன்வாடி அல்லது ஆரம்ப சுகாதார நிலையத்தில் பதிவு செய்தல்',
        titleEn: 'Register at Anganwadi / PHC',
        description: 'கர்ப்பம் தரித்த 4 மாதங்களுக்குள் கிராம சுகாதார செவிலியர் (VHN) அல்லது அங்கன்வாடி பணியாளரிடம் PICME எண் பதிவு செய்யவும்.',
        descriptionEn: 'Register with Anganwadi worker or Village Health Nurse within first 4 months.'
      },
      {
        stepNumber: 2,
        title: 'முத்துலட்சுமி ரெட்டி மகப்பேறு & PMMVY படிவம் பூர்த்தி செய்தல்',
        titleEn: 'Form Fill-up by Health Worker',
        description: 'அங்கன்வாடி பணியாளரே அனைத்து ஆவணங்களையும் பெற்று இணையதளத்தில் உங்கள் விண்ணப்பத்தை பதிவு செய்வார்.',
        descriptionEn: 'Anganwadi worker submits your online application on the government portal.'
      },
      {
        stepNumber: 3,
        title: 'தவணை முறையில் பணம் வங்கி கணக்கில் சேருதல்',
        titleEn: 'Direct Installment Deposits',
        description: 'தடுப்பூசி மற்றும் மருத்துவ பரிசோதனைகளின் அடிப்படையில் தவணைத் தொகைகள் நேரடியாக உங்கள் வங்கி கணக்கில் செலுத்தப்படும்.',
        descriptionEn: 'Installments deposited into your bank account following required ANC checkups.'
      }
    ],
    faq: [
      {
        qTa: 'தமிழ்நாட்டில் டாக்டர் முத்துலட்சுமி ரெட்டி மகப்பேறு நிதி உதவி திட்டமும் இதனுடன் கிடைக்குமா?',
        qEn: 'Is Tamil Nadu Dr. Muthulakshmi Reddy Maternity Scheme also available?',
        aTa: 'ஆம், தமிழ்நாட்டில் இந்த இரண்டு திட்டங்களும் ஒருங்கிணைக்கப்பட்டு கர்ப்பிணி தாய்மார்களுக்கு ஊட்டச்சத்து பெட்டகம் மற்றும் மொத்தம் ₹18,000 வரை நிதி உதவி கிடைக்கிறது.',
        aEn: 'Yes, integrated with TN Muthulakshmi Reddy scheme providing up to ₹18,000 total benefits plus nutrition kits.'
      }
    ]
  },
  {
    id: 'lakhpati_didi',
    name: 'மகளிர் சுய உதவிக்குழு வாழ்வாதார உதவி (Lakhpati Didi)',
    nameEn: 'SHG Livelihood Scheme (Lakhpati Didi / TNSRLM)',
    badge: 'சுயதொழில் & சிறு கடன் உதவி',
    badgeEn: 'Enterprise & Micro-Credit Support',
    category: 'shg_livelihood',
    purpose: 'கிராமப்புற மகளிர் சுய உதவிக்குழுக்களுக்கு (SHG) தொழில் தொடங்க வட்டியில்லா அல்லது குறைந்த வட்டி கடன், தொழில் பயிற்சி மற்றும் சந்தை வாய்ப்பு வழங்கும் அரசு திட்டம்.',
    purposeEn: 'Empowering rural women in Self Help Groups with financial micro-credit, livestock & enterprise training, and seed capital to earn at least ₹1 Lakh annually.',
    benefitAmount: 'குழுவிற்கு ₹5-10 லட்சம் வரை சுழல் நிதி மற்றும் வங்கிக் கடன்',
    benefitAmountEn: 'Revolving fund & bank linkage up to ₹5-10 Lakhs',
    department: 'தமிழ்நாடு ஊரக வாழ்வாதார இயக்கம் (TNSRLM - மதி)',
    departmentEn: 'Tamil Nadu State Rural Livelihoods Mission (TNSRLM)',
    stateOrRegion: 'All India / Tamil Nadu',
    officialUrl: 'https://mathi.tn.gov.in',
    helpline: '155330',
    targetBeneficiary: 'கிராமப்புற மகளிர் சுய உதவிக்குழு உறுப்பினர்கள்',
    targetBeneficiaryEn: 'Rural women in registered Self Help Groups (SHG)',
    sourceReference: 'Ministry of Rural Development & TNSRLM',
    lastVerifiedDate: '2026-09-18',
    isVerifiedOfficial: true,
    eligibilityCriteria: [
      {
        id: 'shg_member',
        question: 'நீங்கள் உங்கள் ஊரில் உள்ள பதிவு செய்யப்பட்ட மகளிர் சுய உதவிக்குழுவில் (SHG) உறுப்பினராக உள்ளீர்களா?',
        questionEn: 'Are you a member of a registered Women’s Self Help Group (SHG)?',
        shortLabel: 'சுய உதவிக்குழு உறுப்பினர்',
        shortLabelEn: 'SHG Member',
        type: 'boolean',
        explanationIfMet: 'சுய உதவிக்குழு உறுப்பினர்களுக்கு அரசு கடன் மற்றும் மானியம் முன்னுரிமை உண்டு.',
        explanationIfMetEn: 'Registered SHG members get priority loan and subsidy linkages.',
        explanationIfNotMet: 'உங்கள் ஊரில் உள்ள புதிய அல்லது பழைய சுய உதவிக்குழுவில் இணைந்து தகுதி பெறலாம்.',
        explanationIfNotMetEn: 'You can join a local Panchayat SHG to gain eligibility.'
      },
      {
        id: 'rural_residence',
        question: 'நீங்கள் கிராமப்புற ஊராட்சியில் வசிக்கிறீர்களா?',
        questionEn: 'Do you reside in a rural village panchayat?',
        shortLabel: 'கிராமப்புற வசிப்பிடம்',
        shortLabelEn: 'Rural Resident',
        type: 'boolean',
        explanationIfMet: 'தமிழ்நாடு ஊரக வாழ்வாதார இயக்கத்திற்கு கிராமப் பெண்கள் தகுதியானவர்கள்.',
        explanationIfMetEn: 'Rural women are primary beneficiaries under TNSRLM.',
        explanationIfNotMet: 'நகர்ப்புற பெண்களுக்கு NULM மூலமும் மகளிர் திட்டங்கள் உள்ளன.',
        explanationIfNotMetEn: 'Urban women can access related NULM livelihood assistance.'
      }
    ],
    documents: [
      {
        id: 'shg_book',
        name: 'சுய உதவிக்குழு சேமிப்பு புத்தகம் / குழு தீர்மான நகல்',
        nameEn: 'SHG Passbook / Group Resolution Copy',
        description: 'குழு உறுப்பினராக இருப்பதற்கான சேமிப்பு அட்டை அல்லது பஞ்சாயத்து கூட்டமைப்பு (PLF) சான்று.',
        descriptionEn: 'SHG membership passbook or Panchayat Level Federation certification.',
        sampleTips: 'குழுவின் பெயர் மற்றும் உங்கள் சேமிப்பு பதிவு.',
        sampleTipsEn: 'Group name and savings records.',
        isMandatory: true
      },
      {
        id: 'aadhaar_shg',
        name: 'ஆதார் அட்டை',
        nameEn: 'Aadhaar Card',
        description: 'உறுப்பினரின் ஆதார் அட்டை நகல்.',
        descriptionEn: 'Applicant Aadhaar copy.',
        sampleTips: 'வங்கி கணக்குடன் இணைந்திருக்க வேண்டும்.',
        sampleTipsEn: 'Linked with bank.',
        isMandatory: true
      },
      {
        id: 'bank_shg',
        name: 'தனிநபர் வங்கி சேமிப்பு கணக்கு புத்தகம்',
        nameEn: 'Bank Savings Account Passbook',
        description: 'மானியம் மற்றும் கடன் வரவு வைக்க சொந்த வங்கி கணக்கு.',
        descriptionEn: 'Savings passbook for individual subsidy transfer.',
        sampleTips: 'IFSC மற்றும் கணக்கு எண் தெளிவாக இருக்க வேண்டும்.',
        sampleTipsEn: 'Clear IFSC code and account number.',
        isMandatory: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'கிராம ஊராட்சி அளவிலான கூட்டமைப்பை (PLF) அணுகவும்',
        titleEn: 'Meet Panchayat Level Federation (PLF)',
        description: 'உங்கள் கிராம பஞ்சாயத்தில் உள்ள மகளிர் திட்ட சமுதாய வழிகாட்டி (CST) அல்லது PLF தலைவியை அணுகவும்.',
        descriptionEn: 'Connect with your village Panchayat Level Federation leader or Community Resource Person.'
      },
      {
        stepNumber: 2,
        title: 'தொழில் அல்லது வாழ்வாதார திட்டத்தை தேர்வு செய்யவும்',
        titleEn: 'Select Enterprise / Skill Track',
        description: 'தையல், ஆடு வளர்ப்பு, நாட்டுக்கோழி, சிறுதானிய உணவு தயாரிப்பு அல்லது கைவினைப் பொருட்கள் போன்ற திட்டத்தை தேர்வு செய்யலாம்.',
        descriptionEn: 'Choose tailoring, dairy, poultry, millet processing, or local retail enterprise.'
      },
      {
        stepNumber: 3,
        title: 'வங்கி கடன் இணைப்பு மற்றும் அரசு மானியம் பெறுதல்',
        titleEn: 'Bank Loan Linkage & Subsidy',
        description: 'வங்கியுடன் இணைப்பு ஏற்படுத்தப்பட்டு குறைந்த வட்டியில் கடன் மற்றும் அரசின் நிதி உதவி வழங்கப்படும்.',
        descriptionEn: 'Bank linkage established with concessional interest and revolving government subsidy.'
      }
    ],
    faq: [
      {
        qTa: 'புதிதாக குழு தொடங்கினால் கடன் உதவி கிடைக்குமா?',
        qEn: 'Can newly formed groups receive assistance?',
        aTa: 'குழு தொடங்கி 3-6 மாதங்கள் வரை ஒழுங்காக சேமித்து கூட்டங்கள் நடத்திய பின் அரசு சுழல் நிதி மற்றும் வங்கிக் கடன் கிடைக்கும்.',
        aEn: 'After 3-6 months of consistent group meetings and internal savings, bank credit is disbursed.'
      }
    ]
  },
  {
    id: 'pm_vishwakarma',
    name: 'பிரதம மந்திரி விஸ்வகர்மா திட்டம் (பெண்கள் கைவினை & தையல் கலைஞர்)',
    nameEn: 'PM Vishwakarma Scheme (Women Artisans & Tailors)',
    badge: '₹15,000 கருவி மானியம் & ₹3 லட்சம் குறைந்த வட்டிக் கடன்',
    badgeEn: '₹15,000 Tool Kit Grant & Collateral-Free Loan',
    category: 'skill_development',
    purpose: 'பாரம்பரிய கைவினைத் தொழில் மற்றும் தையல் (Darzi), கூடை முடைதல், கைவினைப் பொருட்கள் செய்யும் பெண்களுக்கு திறன் பயிற்சி, ₹15,000 இலவச கருவி மானியம் மற்றும் 5% குறைந்த வட்டியில் கடன் வழங்கும் மத்திய அரசு திட்டம்.',
    purposeEn: 'End-to-end skill support, modern toolkit incentive of ₹15,000, and 5% concessional credit for women craftspeople, tailors, and rural artisans.',
    benefitAmount: '₹15,000 இலவச உபகரண மானியம் + ₹3 லட்சம் வரை 5% கடன்',
    benefitAmountEn: '₹15,000 Free Toolkit Voucher + Up to ₹3 Lakhs loan at 5%',
    department: 'மத்திய குறு, சிறு மற்றும் நடுத்தர தொழில் அமைச்சகம் (MSME)',
    departmentEn: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    stateOrRegion: 'All India',
    officialUrl: 'https://pmvishwakarma.gov.in',
    helpline: '18002677777',
    targetBeneficiary: 'பெண் தையல் கலைஞர்கள், கைவினைஞர்கள், கூடை முடைவோர்',
    targetBeneficiaryEn: 'Traditional women artisans, tailors, basket makers, doll makers',
    sourceReference: 'Ministry of MSME Official PM Vishwakarma Portal',
    lastVerifiedDate: '2026-09-12',
    isVerifiedOfficial: true,
    eligibilityCriteria: [
      {
        id: 'traditional_trade',
        question: 'நீங்கள் தையல் (Darzi), கூடை முடைதல், பூமாலை தொடுத்தல் அல்லது கைவினை தொழில் செய்பவரா?',
        questionEn: 'Do you practice tailoring (Darzi), basket weaving, toy making, or traditional crafts?',
        shortLabel: 'கைவினை / தையல் தொழில்',
        shortLabelEn: 'Artisan / Tailor Trade',
        type: 'boolean',
        explanationIfMet: 'அங்கீகரிக்கப்பட்ட 18 பாரம்பரிய தொழில்களில் தையல் மற்றும் கைவினை அடங்கும்.',
        explanationIfMetEn: 'Tailoring and craft trades are covered under Vishwakarma.',
        explanationIfNotMet: 'அங்கீகரிக்கப்பட்ட 18 பாரம்பரிய கைவினைத் தொழில் செய்பவர்களுக்கு மட்டுமே இத்திட்டம் பொருந்தும்.',
        explanationIfNotMetEn: 'Must practice one of the recognized artisan trades.'
      },
      {
        id: 'age_vishwakarma',
        question: 'உங்கள் வயது 18 அல்லது அதற்கு மேல் உள்ளதா?',
        questionEn: 'Are you 18 years of age or older?',
        shortLabel: 'வயது 18+',
        shortLabelEn: 'Age 18+',
        type: 'boolean',
        explanationIfMet: 'வயது தகுதி பூர்த்தியாகிறது.',
        explanationIfMetEn: 'Meets minimum age limit.',
        explanationIfNotMet: '18 வயதுக்கு மேற்பட்டவர்களுக்கு மட்டுமே பயிற்சி மற்றும் கடன் கிடைக்கும்.',
        explanationIfNotMetEn: 'Applicant must be at least 18 years old.'
      }
    ],
    documents: [
      {
        id: 'aadhaar_vishwa',
        name: 'ஆதார் அட்டை (Aadhaar with Mobile Linked)',
        nameEn: 'Aadhaar Card (Mobile Linked)',
        description: 'OTP சரிபார்ப்புக்கு மொபைல் எண் இணைக்கப்பட்ட ஆதார் அட்டை.',
        descriptionEn: 'Aadhaar card linked with active mobile number for biometric verification.',
        sampleTips: 'அலைபேசி எண் இணைந்திருக்க வேண்டும்.',
        sampleTipsEn: 'Active mobile linked.',
        isMandatory: true
      },
      {
        id: 'bank_vishwa',
        name: 'வங்கி கணக்கு புத்தகம்',
        nameEn: 'Bank Account Passbook',
        description: 'கருவி மானியம் ₹15,000 மின்-வவுச்சராக வரவு வைக்க சேமிப்பு கணக்கு.',
        descriptionEn: 'Savings account passbook for digital voucher credit.',
        sampleTips: 'IFSC குறியீடு தெளிவாக இருக்க வேண்டும்.',
        sampleTipsEn: 'Clear IFSC code.',
        isMandatory: true
      },
      {
        id: 'ration_vishwa',
        name: 'ஸ்மார்ட் குடும்ப அட்டை (Ration Card)',
        nameEn: 'Smart Ration Card',
        description: 'குடும்ப உறுப்பினர் விவர சரிபார்ப்புக்கு.',
        descriptionEn: 'For family verification.',
        sampleTips: 'குடும்ப அட்டை எண்.',
        sampleTipsEn: 'Ration card number.',
        isMandatory: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'அருகிலுள்ள CSC அல்லது இ-சேவை மையத்தில் கைரேகை பதிவு செய்து விண்ணப்பிக்கவும்',
        titleEn: 'Biometric Registration at CSC / e-Sevai',
        description: 'பொது சேவை மையத்தில் (CSC) உங்கள் கைரேகை வைத்து PM விஸ்வகர்மா போர்ட்டலில் இலவசமாக பதிவு செய்யவும்.',
        descriptionEn: 'Visit local Common Service Centre (CSC) for free biometric e-KYC registration.'
      },
      {
        stepNumber: 2,
        title: 'கிராம பஞ்சாயத்து தலைவர் / நகராட்சி சரிபார்ப்பு',
        titleEn: 'Gram Panchayat Verification',
        description: 'உங்கள் கிராம பஞ்சாயத்து தலைவர் அல்லது நகராட்சி அலுவலர் உங்கள் தொழிலை சரிபார்த்து ஒப்புதல் அளிப்பார்.',
        descriptionEn: 'Panchayat or local urban body approves your trade application.'
      },
      {
        stepNumber: 3,
        title: '5 நாட்கள் அடிப்படை திறன் பயிற்சி & நாள்தோறும் ₹500 உதவித்தொகை',
        titleEn: '5-Day Skill Training with ₹500/day Stipend',
        description: 'அருகிலுள்ள பயிற்சி மையத்தில் நவீன தையல்/கைவினை பயிற்சி பெற்று நாள் ஒன்றுக்கு ₹500 ஊக்கத்தொகை பெறலாம்.',
        descriptionEn: 'Undergo 5-day skill upgrading with ₹500 daily allowance and PM Vishwakarma Certificate.'
      },
      {
        stepNumber: 4,
        title: '₹15,000 மின்-வவுச்சர் மூலம் நவீன தையல் இயந்திரம் வாங்குதல்',
        titleEn: '₹15,000 Digital Voucher for Modern Toolkit',
        description: '₹15,000 மதிப்பிலான e-RUPI வவுச்சர் பெற்று புதிய மோட்டார் தையல் மெஷின் அல்லது கருவிகளை வாங்கலாம்.',
        descriptionEn: 'Receive ₹15,000 digital e-RUPI voucher to purchase modern tools or electric sewing machines.'
      }
    ],
    faq: [
      {
        qTa: 'விஸ்வகர்மா திட்டத்தில் கடன் வாங்கினால் சொத்து ஜாமீன் (Security) வைக்க வேண்டுமா?',
        qEn: 'Is collateral or property security required for loans?',
        aTa: 'இல்லை, எந்தவித சொத்து ஜாமீனும் இன்றி முதல் தவணையாக ₹1 லட்சம், இரண்டாவது தவணையாக ₹2 லட்சம் 5% குறைந்த வட்டியில் கிடைக்கும்.',
        aEn: 'No collateral required. First tranche ₹1 Lakh, second tranche ₹2 Lakhs at just 5% interest.'
      }
    ]
  }
];

export const VERIFIED_EMERGENCY_HELPLINES = [
  {
    number: '181',
    name: 'Women Helpline (Toll Free, 24/7)',
    nameTa: 'பெண்கள் உதவி மையம் (24/7 இலவச உதவி)',
    desc: 'National 24/7 emergency and welfare helpline for women safety, government schemes, and family support.',
    descTa: 'பெண்களுக்கான அனைத்து அரசு திட்டங்கள், பாதுகாப்பு மற்றும் அவசர உதவிக்கு 24 மணி நேரமும் இலவசமாக அழைக்கலாம்.',
    category: 'women_safety'
  },
  {
    number: '1100',
    name: 'Chief Minister’s Helpline (CM Helpline)',
    nameTa: 'முதலமைச்சரின் உதவி மையம் (1100)',
    desc: 'Tamil Nadu citizen portal and grievance helpline for all state government schemes, subsidies, and e-Sevai queries.',
    descTa: 'தமிழ்நாடு அரசு சேவைகள், திட்டங்கள், மற்றும் இ-சேவை தொடர்பான சந்தேகங்களுக்கு.',
    category: 'govt_schemes'
  },
  {
    number: '14417',
    name: 'Education & Student Support Helpline',
    nameTa: 'பள்ளிக் கல்வி & உயர்கல்வி உதவி மையம்',
    desc: 'Government education assistance, Pudhumai Penn college scheme, and scholarships guidance.',
    descTa: 'புதுமைப் பெண் திட்டம் மற்றும் கல்வி உதவித்தொகை வழிகாட்டல்.',
    category: 'education'
  },
  {
    number: '104',
    name: 'Health & Maternal Helpline',
    nameTa: 'மருத்துவ & தாய்-சேய் நல உதவி எண்',
    desc: 'Maternal health, pregnant women support, PICME registration, and Primary Health Centre guidance.',
    descTa: 'கர்ப்பிணி பெண்கள் உதவி, PICME பதிவு மற்றும் ஆரம்ப சுகாதார மைய வழிகாட்டல்.',
    category: 'health'
  },
  {
    number: '155330',
    name: 'Self Help Group & Livelihood Helpline',
    nameTa: 'மகளிர் சுய உதவிக்குழு & வாழ்வாதார உதவி எண்',
    desc: 'Rural livelihood mission, SHG bank linkage, enterprise credit, and micro-loan assistance.',
    descTa: 'கிராமப்புற சுய உதவிக்குழுக்கள் கடன் மற்றும் வாழ்வாதார வழிகாட்டல்.',
    category: 'livelihood'
  }
];
