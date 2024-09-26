import Link from "next/link";

const TermsOfService = () => {
  return (
    <div className="terms">
      <div className="popup__content">
        <div className="terms terms--scroll">
          <div className="container">
            <div className="terms-header">
              <span className="terms-title">Terms of Service</span>
            </div>
            <p className="terms-desc">
              Welcome to the BTC Advance website. The following Terms of Service
              (the “Terms”) govern your access to and use of Crypto.Exchange.
              Certain sections of the Terms govern your user, borrower and other
              accounts (your “BTC Advance”) accessed via the Online Platform.
              Additional terms incorporated into and made a part of these Terms
              govern specific services we or our affiliates may provide to you,
              such as crypto interest accounts, non-interest-bearing crypto
              custody accounts, cryptocurrency trading, and ACH transfers. All
              use of the Online Platform and your BTC Advance Account is subject
              to the Terms.
               <br />
              By applying for a BTC Advance Account or using the Online
              Platform, you acknowledge that you have read, understood and agree
              to comply with the Terms. If you do not agree with anything
              contained in the Terms, please do not submit information to,
              access information from, or otherwise utilize the Online Platform.
              <br />
              In the Terms, users of this Online Platform and holders of BTC
              Advance Accounts, including owners, employees, agents and
              affiliates of any business, corporation, partnership or other
              entity that is a user, borrower or investor, are sometimes
              referred to in the Terms as “you” or “your.” The operator of the
              Online Platform, BTC Advance LLC., a Wyoming corporation, is
              referred to as “BTC Advance,” “we,” “us” or “our” in the Terms.
              Together, you and we may be collectively referred to as “Parties.”
            </p>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Modifications to the Terms of Service
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    BTC Advance reserves the right to make changes to the Terms
                    at any time. It is your responsibility to review the Terms
                    from time to time to see if modifications have been made.
                    Your continued use of the Online Platform after any
                    modification of the Terms will conclusively indicate that
                    you accept those changes. Notwithstanding the above, we will
                    seek your consent to future modifications to the Terms to
                    the extent we are required to do so by law.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Electronic Communication
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    We, or our affiliated BTC Advance entities, may be required
                    to provide certain legal and regulatory disclosures,
                    periodic statements and confirmations, notices, tax forms
                    and other communications (collectively “Communications”) to
                    you in written form. By agreeing to these Terms, you consent
                    to BTC Advance delivering such Communications to you in
                    electronic form, including e-mail. Consent for electronic
                    delivery applies to every year the Communications are
                    furnished. If you no longer have access to your account to
                    receive the Communications in electronic format, then you
                    may request the Communication in written form.
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    You agree that all terms and conditions, agreements,
                    notices, disclosures and other communications that we
                    provide to you electronically satisfy any legal requirement
                    such communications would satisfy if they were provided in
                    writing. BTC Advance will use reasonable efforts to honor
                    any request you may have to opt out from receiving certain
                    e-mails. With respect to these Terms, you waive any rights
                    to require an original (non-electronic) signature or
                    delivery or retention of non-electronic records, to the
                    extent such waiver is not prohibited under applicable law.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">Eligibility</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    The Services are not available to persons generally under
                    the age of 18 (but note that the minimum age requirement may
                    be higher in some states) or to persons who are not legal
                    residents of the United States. BY USING THE SITE OR
                    APPLYING FOR OR USING ANY OF THE SERVICES, YOU REPRESENT AND
                    WARRANT THAT YOU ARE AT LEAST 18 YEARS OF AGE OR THAT YOU
                    ARE AT LEAST THE MINIMUM AGE THAT IS REQUIRED IN YOUR STATE
                    AND ARE A LEGAL RESIDENT OF THE UNITED STATES. Not all
                    Services are available in all geographic areas. Your
                    eligibility for particular Services is subject to final
                    determination by NETCREDIT, its affiliates, and/or its
                    partner lenders.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">Privacy Policy</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    Your privacy is very important to us. We encourage you to
                    read BTC Advance’s Privacy Policy (located at{" "}
                    <Link href={"/privacyPolicy"}>
                      <a className="link link--green link--inline link--underline">
                        {"https:// BTC Advance.credit/privacy"}
                      </a>
                    </Link>
                    ) (the “Privacy Policy”), which explains how we treat your
                    personal information and protect your privacy when you are
                    using the Online Platform. By using the Online Platform, you
                    agree that BTC Advance may use your personal information as
                    set forth in the Privacy Policy. BTC Advance’s Privacy
                    Policy is hereby incorporated in the Terms by reference in
                    its entirety.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">Registration</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    Basic access to the Online Platform is publicly accessible.
                    However, to use certain features of the Online Platform, you
                    must complete the registration process by verifying your
                    email address. Once registered, a BTC Advance Account will
                    be created for you to access your application and other
                    resources. When you open a crypto advance account, your use
                    of that account is governed by the Interest Account Terms,
                    located at{" "}
                    <Link href={"/signUp"}>
                      <a className="link link--green link--inline link--underline">
                        https://www. Crypto.Exchange/advance-account-terms
                      </a>
                    </Link>
                    , which are incorporated by reference into these Terms.{" "}
                    <br />
                    You agree that the registration information you provide is
                    accurate, complete and current. You further agree to
                    promptly update that information to keep it accurate,
                    complete and current.
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    YOU UNDERSTAND THAT A CHANGE IN YOUR STATE OF RESIDENCE MAY
                    IMPACT YOUR ELIGIBILITY TO ACCESS AND USE THE ONLINE
                    PLATFORM, AND HEREBY AGREE TO NOTIFY US IN ADVANCE OF ANY
                    CHANGE IN YOUR STATE OF RESIDENCE. <br />
                    If you register on behalf of a business entity or other
                    organization, you represent and warrant that you have the
                    authority to provide the information required and to bind
                    the organization to the Terms. You acknowledge and agree
                    that BTC Advance, in its sole discretion, may suspend or
                    discontinue your, and refuse any and all current and future,
                    access to or use of you BTC Advance Account at any time
                    without notice to you.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Identity Verification
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    As a regulated financial service company operating in the
                    United States, we are required to identify clients on our
                    platform. Identification ensures we remain in compliance
                    with applicable information reporting requirements in the
                    jurisdictions in which we operate, something that is
                    necessary for us to be able to continue to offer digital
                    currency services to our clients. BTC Advance collects and
                    verifies your personal and financial information. We also
                    may obtain personal information from third parties in order
                    to verify your identity, or to prevent fraud. Personal
                    information collected from any source may include, among
                    other things, your name and address, Social
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    Security or taxpayer identification number, and date of
                    birth. You certify under penalty of perjury that the
                    information provided is correct. You hereby authorize us, or
                    a third-party service provider that we designate, to take
                    any measures that we consider necessary to confirm the
                    personal information you provide, verify and authenticate
                    your personal information, and take any action we deem
                    necessary based on the results. You acknowledge that this
                    process may result in a delay in registering your BTC
                    Advance Account, and that you may not be authorized to
                    access or use your BTC Advance Account until your
                    registration has been successfully completed.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title terms-block__title--bold">
                  W-9 Certification
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-desc">
                    If you are a United States person, then as a condition of
                    using BTC Advance’s services you certify under penalties of
                    perjury that:{" "}
                  </p>
                  <ol className="terms-list">
                    <li className="terms-list__item">
                      The Social Security number or Employer Identification
                      Number you provide is correct; and
                    </li>
                    <li className="terms-list__item">
                      You are not subject to backup withholding due to the
                      failure to report interest and dividend income.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Account Security and Password
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    BTC Advance disclaims all liability, and you acknowledge and
                    agree that we will not be liable, for or in connection with
                    any harm or damages to you or to any party resulting from
                    the theft or unauthorized use of your user ID or password.
                    Data transmitted via the Online Platform may use a Secure
                    Sockets Layer (SSL) protocol, and data may be encrypted on
                    some pages of the Online Platform. To the extent such
                    technology is utilized on a given page, you may be unable to
                    use certain account or customization features of the Online
                    Platform unless your web browser software supports such
                    encryption. Please note that no technology can be considered
                    completely secure or impenetrable and internet protocols and
                    other public and/or proprietary technology used or accessed
                    by the Online Platform may be vulnerable to exploitation or
                    compromise by persons engaged in hacking or criminal
                    conduct.
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    Subject to applicable law, BTC Advance shall have no
                    liability to you for any such exploitation or criminal
                    conduct by third parties. <br />
                    As part of our legal compliance program (“AML Program”), we
                    will monitor your BTC Advance Account and your use of the
                    Online Platform, and review your personal information on an
                    ongoing basis, as may be required by law or pursuant to our
                    internal policies and procedures. At any time, we may
                    require you to provide us with additional personal
                    information as a condition to your continued access to and
                    use of your BTC Advance Account and the Online Platform.
                    During such time, your access to and use of your BTC Advance
                    Account and the Online Platform may be temporarily
                    restricted.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Potentially Fraudulent Activity
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    Any actual or suspected unauthorized access or unauthorized
                    activity will be treated by us as potentially fraudulent
                    (“Potentially Fraudulent Activity”). You agree to notify us
                    immediately if you become aware of or suspect any
                    Potentially Fraudulent Activity by submitting a support
                    ticket at www.Crypto.Exchange/Contact-Us. For avoidance of
                    doubt, you are deemed to be aware of Potentially Fraudulent
                    Activity upon receipt of any notice of the occurrence of
                    such activity. Upon receipt of written notice from you of
                    any Potentially Fraudulent Activity, we will take reasonable
                    steps to protect your BTC Advance Account, including, for
                    example, by temporarily restricting access to your BTC
                    Advance Account, suspending any pending transactions, or
                    requiring you to change your login credentials.
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    You agree to promptly report any Potentially Fraudulent
                    Activity to legal authorities if required by applicable law,
                    and to provide us a copy of any report prepared by such
                    legal authorities. In the event of a legal investigation of
                    any Potentially Fraudulent Activity, you further agree to
                    (i) cooperate fully with the legal authorities and BTC
                    Advance in such investigation; (ii) complete any required
                    affidavits promptly, accurately and thoroughly; and (iii)
                    allow BTC Advance, or any third-party designated by us,
                    access to your mobile device, computer, and network as may
                    be relevant to such investigation. Failure to cooperate in
                    any such investigation may cause delays in regaining access
                    to your BTC Advance Account and any funds held within.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Acceptable Use of the Online Platform
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    You agree that any information that you provide (about your
                    identity, finances, and relationships) is accurate, correct,
                    and up to date. You agree that you are 18 years of age or
                    older; able to form a binding contract with us; and are
                    acting on your own behalf (and have not been banned,
                    terminated, or otherwise denied access to the Online
                    Platform by BTC Advance or by law).
                    <br />
                    <br />
                    Accessing the information, resources, services, products and
                    tools of this Online Platform by any other means than we
                    provide is strictly prohibited. You specifically agree not
                    to access or tamper with the Online Platform, for any
                    purpose, through any automated, unethical or unconventional
                    means, including accessing or collecting personally
                    identifiable information or account information (including
                    user names, passwords, e-mail addresses or other personal,
                    financial or contact information) with respect to BTC
                    Advance users, borrowers, investors, lenders or employees.{" "}
                    <br />
                    You may not violate, interfere with, impair or circumvent
                    the ordinary operation, security, privacy or mission of the
                    Online Platform or BTC Advance’s products, services or data,
                    including overburdening, spamming, engaging in a denial of
                    service attack or similar activities (or attempt to do any
                    of the above).
                    <br />
                    <br />
                    You are solely responsible for all activity that occurs on
                    or under your BTC Advance Account (whether or not expressly
                    authorized by you), and for maintaining the confidentiality
                    of your login details. BTC Advance shall have no liability
                    to you or any other person for acts or omissions made or
                    committed by your agent, representative or third-party
                    service provider in respect of your BTC Advance Account.
                    <br />
                    <br />
                    You will not transmit to BTC Advance or make available on or
                    upload any information to the Online Platform that: (i) is
                    commercial or promotional in nature; (ii) is unlawful,
                    harmful, deceptive, or otherwise violates the legal rights
                    or privacy of others; (iii) is capable of giving rise to
                    legal action whether against you or BTC Advance or any
                    affiliate third party; (iv) infringes any patent, trademark,
                    trade secret, copyright, or other property rights of any
                    party; (v) impersonates any person or entity (including BTC
                    Advance or its employees and representatives); or (iv)
                    contains viruses, malware or any program, code or technology
                    designed to disrupt, intercept, impair or destroy the
                    functionality of the Online Platform or its software, data
                    or network.
                    <br />
                    <br />
                    BTC Advance reserves the right to edit, restrict or remove
                    any content you provide for any reason at any time. In
                    addition, BTC Advance does not control any information
                    provided by other users that may be made available on or
                    through the Online Platform. Notwithstanding BTC Advance’s
                    rights under the Terms, BTC Advance does not undertake, and
                    shall not be obligated, to monitor the submission of any
                    content to, or the publication of any content on, the Online
                    Platform at any time. BTC Advance reserves the right to
                    refuse service, terminate relationships, and cancel orders
                    or transactions in its discretion.
                    <br />
                    <br />
                    By submitting information, feedback or other material to BTC
                    Advance, including on or through the Online Platform or your
                    BTC Advance Account, you: (i) acknowledge that such
                    information is non-confidential, except for any personal and
                    financial information; (ii) grant BTC Advance a perpetual,
                    worldwide, royalty-free, irrevocable, transferable,
                    sublicensable, fully paid-up right to copy, use, reproduce,
                    modify, adapt, publish, create derivative works from,
                    translate, transmit, display, distribute, market, promote,
                    sell or offer for sale, rent or lease such information or
                    materials in any form or medium known or later developed;
                    and (iii) agree that you will have no claim against for any
                    actual or alleged infringement of any proprietary rights,
                    rights of privacy or publicity, moral rights or rights of
                    attribution in connection with our use of any content you
                    provide.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Supported Digital Assets
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    A list of digital assets that BTC Advance currently supports
                    is available via the Online Platform. BTC Advance may
                    discontinue support for a digital asset at any time and for
                    any reason at our sole discretion, including due to changes
                    in a given digital asset’s characteristics or due to a
                    change in the digital asset’s regulatory classification.{" "}
                    <br />
                    <br />
                    YOU WILL NOT BE ABLE TO RETRIEVE ANY UNSUPPORTED DIGITAL
                    ASSET WHICH YOU ATTEMPT TO TRANSFER TO BTC ADVANCE, OR ANY
                    OTHER ASSET WHICH YOU ATTEMPT TO TRANSFER TO AN UNSUPPORTED
                    WALLET OR USING AN UNSUPPORTED NETWORK. BLOCKFI ASSUMES NO
                    LIABILITY, OBLIGATION OR RESPONSIBILITY WHATSOEVER WITH
                    RESPECT TO ANY UNSUPPORTED DIGITAL ASSET, OR ANY ASSETS
                    TRANSFERRED TO AN UNSUPPORTED WALLET OR USING AN UNSUPPORTED
                    NETWORK.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">Network Control</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    BTC Advance does not own or control any of the underlying
                    software through which blockchain networks are formed and
                    cryptocurrencies are created and transacted. In general, the
                    underlying software for blockchain networks tends to be open
                    source such that anyone can use, copy, modify, and
                    distribute it. By using the Online Platform, you understand
                    and acknowledge that BTC Advance is not responsible for the
                    operation of the underlying software and networks that
                    support cryptocurrencies and that BTC Advance makes no
                    guarantee of functionality, security, or availability of
                    such software and networks.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">Forks</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    The underlying network protocols are subject to sudden
                    changes in operating rules, and third parties may from time
                    to time create a copy of a digital asset network and
                    implement changes in operating rules or other features
                    (“Forks”) that may result in more than one version of a
                    network (each, a “Forked Network”) and more than one version
                    of a digital asset (“Forked Assets”). <br />
                    Forked Networks and the available supply of any Forked
                    Assets are wholly outside of the control of BTC Advance, and
                    our ability to deliver Forked Assets resulting from a Forked
                    Network may depend on third parties outside of BTC Advance’s
                    control. You understand and acknowledge that Forks may
                    materially affect the value, function, and even the name of
                    the digital assets associated with your BTC Advance Account.
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    In the event of a Fork, BTC Advance may temporarily suspend
                    certain services on the Online Platform (with or without
                    advance notice to you) while we determine, at our sole
                    discretion, which Forked Network(s) to support. <br />
                    BTC ADVANCE IS UNLIKELY TO SUPPORT MOST FORKED NETWORKS AND
                    MOST FORKED ASSETS WILL LIKELY NOT BE MADE AVAILABLE TO YOU.
                    BTC ADVANCE MAY DETERMINE, IN OUR SOLE DISCRETION, NOT TO
                    SUPPORT A FORKED NETWORK.YOU HAVE NO RIGHT, CLAIM, OR OTHER
                    PRIVILEGE AGAINST BTC ADVANCE TO FORKED ASSETS ON SUCH
                    UNSUPPORTED FORKED NETWORK. BTC ADVANCE MAY, IN OUR SOLE
                    DISCRETION, DETERMINE OUR APPROACH TO SUCH FORKED ASSETS,
                    WHICH MAY INCLUDE ABANDONING OR OTHERWISE ELECTING NOT TO
                    SUPPORT SUCH FORKED ASSETS AS PART OF OUR SERVICES.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">Airdrops</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    In the event that a digital asset network attempts to or
                    does distribute (sometimes called “airdropping” or
                    “bootstrapping”) additional digital assets to or through its
                    digital asset network, such network shall become a Forked
                    Network and subject to the terms set forth above.{" "}
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    BTC ADVANCE DOES NOT SUPPORT AIRDROPS OR TOKENS OR COINS
                    WHICH SUPPLEMENT OR INTERACT WITH A DIGITAL ASSET NETWORK
                    SUPPORTED BY BTC ADVANCE. YOU SHALL NOT USE BTC ADVANCE OR
                    ANY OF ITS SERVICES OR ACCOUNTS TO ATTEMPT TO RECEIVE,
                    REQUEST, SEND, STORE, OR ENGAGE IN ANY OTHER TYPE OF
                    TRANSACTION INVOLVING AIRDROPS OR TOKENS OR COINS WHICH
                    SUPPLEMENT OR INTERACT WITH A DIGITAL ASSET NETWORK
                    SUPPORTED BY BTC ADVANCE. YOU WILL NOT BE ABLE TO RETRIEVE
                    ANY UNSUPPORTED DIGITAL ASSET. BTC ADVANCE ASSUMES NO
                    LIABILITY, OBLIGATION OR RESPONSIBILITY WHATSOEVER IN
                    RESPECT TO ANY UNSUPPORTED DIGITAL ASSET.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">Hosted Wallets</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    Except as set forth in terms specific to your BTC Advance
                    account, digital assets you purchase from us shall be
                    accessible via Online Platform in one or more omnibus
                    wallets, via a third-party custodian. BTC Advance will track
                    the balance and ownership of digital assets stored through
                    the Online Platform in hosted wallets, and you can view the
                    balance of digital in your BTC Advance Account through the
                    Online Platform.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">Fees</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    A schedule of our fees is accessible at https://
                    Crypto.Exchange/fees/. Fees are subject to change, at our
                    sole discretion, and you understand and acknowledge that you
                    are solely responsible for accessing the fee schedule prior
                    to engaging in any services on our Online Platform.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">Taxes</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    BTC Advance will issue 1099 tax forms to persons identified
                    as U.S. citizens or residents who trigger certain taxable
                    transactions. The information reported on 1099 tax forms are
                    also reported to the IRS. As such, information on 1099 tax
                    forms should be incorporated into tax returns for each
                    taxable year that 1099 tax forms are received. <br />
                    <br /> In addition to 1099 tax forms, BTC Advance may also
                    provide other tax figures (e.g., real-time tax positions,
                    unrealized gain/loss positions, and forms 8949). Such tax
                    figures and reports may not represent your overall tax
                    position, as BTC Advance only provides tax figures and
                    reports relating to transactions on BTC Advance, not to
                    other service providers. Cost basis originating outside BTC
                    Advance that was entered using the options BTC Advance
                    provides will not appear on your 1099 tax forms. Such tax
                    figures are provided as a matter of convenience and for your
                    benefit. Aside from the 1099 tax forms described above, BTC
                    Advance is not responsible for and carries no liability as
                    to the accuracy of the tax figures and reports provided.
                    Please consult with your tax advisor when filing your tax
                    return. <br />
                    <br /> BTC Advance allows users to opt into tax loss
                    harvesting. Please be aware that tax loss harvesting may
                    carry risks and associated costs. There are no guarantees
                    that a trade or a buyback will be executed, as there may be
                    market conditions or operational risks. BTC Advance has no
                    knowledge, nor can we guarantee, that any loss generated
                    will be advantageous to your specific tax position. You
                    acknowledge that there is potential market volatility,
                    costs, and associated risks with trading and re-purchasing
                    an asset. <br />
                    <br /> If you traded on platforms other than BTC Advance,
                    then we may not have all of the acquisition information
                    necessary to provide you with a full picture of potential
                    gains and losses. To obtain a full picture of your potential
                    gains and losses you need to resolve any missing cost basis
                    that is present in your account. If you are missing the cost
                    basis for certain assets then BTC Advance’s tax optimizer
                    will prioritize known cost basis transactions first. If you
                    subsequently add cost basis using the options BTC Advance
                    provides then your gain and loss calculations may change.
                    BTC Advance is not responsible for and carries no liability
                    for the accuracy of cost basis information originating
                    outside of BTC Advance.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">Regulatory</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    BTC Advance is registered with the U.S. Department of
                    Treasury Financial Crimes Enforcement Network (“FinCEN”) as
                    a money services business (“MSB”). As a registered MSB,
                    BlockFi is subject to the Bank Secrecy Act and its
                    implementing regulations (collectively, the “BSA”) which set
                    out the requirements imposed upon financial institutions to
                    implement policies and procedures reasonably designed to
                    detect and prevent money laundering and terrorist financing.
                    Your access to and use of the Services is subject to
                    compliance with BTC Advance’s AML Program. BTC Advance’s
                    subsidiaries maintain licenses to lend money and to engage
                    in money transmission activities in certain states, and
                    these licenses may impact our provision and your use of
                    certain services on the Online Platform depending on where
                    you live.
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    Transactions in digital assets are subject to applicable
                    laws, regulations, and rules of federal and state
                    governmental and regulatory authorities (collectively,
                    “Applicable Laws”). Compliance with Applicable Laws may
                    include compliance with any guidance or direction of any
                    regulatory authority or government agency, any writ of
                    attachment, lien, levy, subpoena, warrant, or other legal
                    order (collectively, “Legal Orders”). You understand and
                    acknowledge that in no event will BTC Advance be obligated
                    to affect any transaction it believes would violate any
                    Applicable Law. You further understand and acknowledge that
                    BTC Advance is not responsible for any losses, whether
                    direct or indirect, that you may incur as a result of BTC
                    Advance’s good faith efforts to comply with any Applicable
                    Law, including any Legal Order.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  BTC Advance’s Intellectual Property
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    All rights, title, and interest in and to the Online
                    Platform and the Content (defined below) and any all
                    intellectual property contained therein or relating thereto,
                    including any copyright, patent or trademark, are and will
                    remain the exclusive property of v or its licensors, as
                    applicable. The “Content” includes all contents of the
                    Online Platform, including any logos, identifying marks,
                    images, illustrations, designs, icons, photographs, videos,
                    text and other written and multimedia materials, all of BTC
                    Advance’s loan information (including rate information) and
                    requirements, products, services, advertising materials or
                    collateral, log-in or registration criteria and
                    instructions, help guidelines, user documentation and
                    customer and technical support documents, and the Online
                    Platform’s likeness, look and feel, format, layout,
                    software, code (whether binary, assembly, source, object,
                    HTML or otherwise), routines, scripts, software, platforms
                    and applications, as well as any data, files, archives,
                    folders or downloads available on the Online Platform.
                    Subject to the terms and conditions of the Terms, we grant
                    you a limited, non-transferable, non-sublicenseable,
                    non-exclusive, revocable license to use the Online Platform
                    and the Content for personal use until such time as the
                    Terms terminate or expire or your right to use or access the
                    Online Platform is terminated in accordance with the Terms.
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    Except as explicitly permitted by the Terms, you may not,
                    and you may not allow others to, sell, copy, modify,
                    correct, enhance, create derivative works from, publish,
                    store or in any way distribute or otherwise exploit,
                    including for any purpose competitive to BTC Advance, any
                    Content. You may not, and you may not allow others to: (i)
                    decompile, reverse engineer, convert or otherwise extract or
                    disclose the underlying script, code (whether binary,
                    assembly, source, object, HTML or otherwise) or structure of
                    any Content, or (ii) remove or alter authorship attribution
                    or copyright notices or similar information on the Online
                    Platform or any products or materials embodying or
                    containing any Content. Any violation of the provisions of
                    the Terms regarding BTC Advance’s Intellectual Property may
                    subject you to compensatory and punitive damages, and shall
                    specifically also entitle BTC Advance to equitable relief
                    (including an injunction), in addition to (and not in
                    substitution or replacement for) any other available
                    remedies at law or in equity, without the need for the
                    posting of a bond or any other requirement.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  No Solicitation or Offering; No Advice
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    Except as otherwise expressly noted, the Content and the
                    Online Platform do not constitute an offer to buy or sell or
                    a solicitation of an offer to buy or sell investments,
                    loans, securities, partnership interests, commodities or any
                    other financial instruments; the Content and the Online
                    Platform also do not constitute, and may not be used for or
                    in connection with, an offer or solicitation by anyone in
                    any state or jurisdiction in which such an offer or
                    solicitation is not authorized or permitted, or to any
                    person to whom it is unlawful to make such offer or
                    solicitation.
                    <br />
                    <br />
                    The past performance of any investment, loan, security,
                    partnership interest, commodity or financial instrument is
                    not a guide to future performance. WITHOUT LIMITING ANYTHING
                    IN THE TERMS, BTC ADVANCE MAKES NO WARRANTIES AND BEARS NO
                    LIABILITY WITH RESPECT TO ANY FUND, ANY INVESTMENTS,
                    SECURITIES, PARTNERSHIP INTERESTS, LOANS OR THE PERFORMANCE
                    THEREOF. <br />
                    <br /> While BTC Advance may make certain informational
                    Content available to its users, under no circumstances does
                    BTC Advance provide legal, tax, investment, financial,
                    estate-planning, accounting, or any other advice. BTC
                    Advance may use automated systems in conjunction with: the
                    receipt and handling of orders; the reporting of order
                    acknowledgements, cancelations, and executions; the
                    settlement of transactions; tax and cost basis reporting;
                    and similar recordkeeping and reporting services
                    (collectively, “Automated Systems”). The use of Automated
                    Systems entails risks, including but not limited to
                    interruption of service, systems of communications failures,
                    delays in service, cyberattacks, and errors in the design or
                    functionality of such Automated Systems that could cause
                    damage, expense, or liability to the user. BTC Advance makes
                    no representations or warranty of any kind, express or
                    implied, with respect to the selection, design, security,
                    functionality, or operation of such Automated Systems. BTC
                    Advance expressly disclaims any representation that any
                    Automated System will operate uninterrupted or be
                    error-free. <br />
                    <br /> Although BTC Advance may provide information relating
                    to investment approaches and opportunities to buy or sell
                    assets, you should not construe any features, tools, or
                    other content as legal, tax, investment, financial, or other
                    advice. Nothing contained in BTC Advance’s Online Platform
                    constitutes a solicitation, recommendation, endorsement, or
                    offer by BTC Advance or a third party service provider to
                    buy or sell any asset or other financial instrument. <br />
                    <br /> The Content and the views expressed in the Content do
                    not necessarily reflect the views of BTC Advance as a whole,
                    its directors, officers, employees, shareholders or any part
                    or member thereof or of any third party.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Forward-Looking Statements
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    Certain statements on the Online Platform, including within
                    the Content, may constitute forward-looking statements that
                    involve known and unknown risks, uncertainties and other
                    factors that may cause actual returns of funds, investments,
                    securities or loans to be materially different from any
                    future returns or values expressed or implied by such
                    forward-looking statements. Forward-looking statements
                    typically include words such as may, will, expect, believe,
                    plan, expect, anticipate, intend and other similar
                    terminology. These statements reflect current expectations
                    regarding future events and speak only as of the date of
                    being posted to the Online Platform. Forward-looking
                    statements involve significant risks and uncertainties,
                    should not be read as guarantees of future performance or
                    returns, and will not necessarily be accurate indications of
                    whether or not such returns will be achieved. Given these
                    uncertainties and risks, users of the Online Platform,
                    including any person who may or has invested in any offering
                    made by or on behalf of BTC Advance or its subsidiaries or
                    affiliates, are cautioned not to place undue reliance on
                    such forward-looking statements. Forward-looking statements
                    should not be interpreted as advice and are in no way a form
                    of solicitation, offering, or advice for BTC Advance’s loan
                    product.{" "}
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    The purpose of these forward-looking statements is merely to
                    further explain our products and services and for marketing
                    purposes and should be interpreted as purely speculative.{" "}
                    <br /> A variety of factors could cause the actual results
                    and developments of any fund, investment, security or loan
                    to differ significantly from the results and developments
                    forecasted and implied. Although forward-looking statements
                    contained in the Online Platform, if any, are based upon
                    what BTC Advance and its advisors believe are reasonable
                    assumptions, BTC Advance cannot assure you that actual
                    results, returns or events will be consistent with these
                    forward-looking statements. Forward-looking statements are
                    made as of the date of being posted to the Online Platform,
                    and BTC Advance and its subsidiaries and affiliates assume
                    no obligation, and expressly disclaim any obligation, to
                    update or revise forward-looking statements contained in or
                    incorporated by reference into the Online Platform or the
                    Content or any information supplemental thereto to reflect
                    new information, future events or circumstances or
                    otherwise.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Third-Party Websites and Content
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    The Online Platform may contain links or connections to
                    third party websites. Any such link or connection is
                    provided only as a convenience and should be used at your
                    own risk. BTC Advance has no control over any such other
                    websites, the contents thereof or the products, services or
                    policies represented. The existence of any link or other
                    connection does not imply any affiliation, sponsorship,
                    endorsement, approval, investigation, representation,
                    warranty, verification or monitoring by BTC Advance or
                    create any liability on the part of BTC Advance in respect
                    of such link or connection.{" "}
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    Your use of any such third-party websites is governed by the
                    privacy policies of those sites, which we encourage you to
                    review before using such sites. <br /> BTC Advance will have
                    no responsibility for any liabilities arising from or
                    related to the contents of any third-party website or the
                    use of any such website (including any mobile website) or
                    the privacy policies and customer information practices of
                    any such website.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Termination; Survival of Provision
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    If you are not in full compliance with all of these Terms,
                    the permissions granted to you under these Terms will
                    automatically terminate, and in such circumstance, you will
                    no longer use or access, or be entitled to use or access,
                    the Online Platform, the Content or any BTC Advance Account.{" "}
                    <br /> BTC Advance may terminate your right to use the
                    Online Platform, or block you from future use, at any time
                    in its sole discretion, with or without cause, and without
                    notice to you. Some circumstances in which BTC Advance may
                    exercise this right to terminate your right to use the
                    Online Platform include, but are not limited to: (i) you
                    have breached any provision of the Terms; (ii) you have
                    engaged in conduct which BTC Advance, in its sole
                    discretion, considers to be unacceptable; (iii) BTC Advance
                    is required by law to do so; or (iv) BTC Advance no longer
                    provides the Online Platform.
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    The above are only examples of circumstances in which BTC
                    Advance may terminate your right to use the Online Platform
                    and BTC Advance may terminate your right to use the Online
                    Platform for any other reason in its sole discretion. We
                    will not be liable to you due to or by reason of our
                    termination of your right to use the Online Platform or the
                    automatic termination of your right to use the Online
                    Platform for non-compliance set forth above. <br /> Any
                    ongoing obligations on you, and the provisions relating to:
                    (i) BTC Advance’s Intellectual Property; (ii) No
                    Solicitation or Offering; (iii) BTC Advance’s Remedies; (iv)
                    Indemnification; (v) Limitation of Liability; (vi) General,
                    and (vii) any other provisions designed to survive, will
                    survive any termination or expiration of the Terms for any
                    reason.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  BTC Advance’s Remedies
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    Without prejudice to BTC Advance’s other rights under the
                    Terms, if you breach the Terms in any way, BTC Advance may
                    take such action as BTC Advance deems appropriate to deal
                    with the breach, including suspending your access to the
                    Online Platform, prohibiting you from accessing the Online
                    Platform, blocking computers using your IP address from
                    accessing the Online Platform, contacting your internet
                    service or other telecommunications provider to request that
                    it block your access to the Online Platform and bringing
                    court proceedings or taking other legal action against you.
                    If you violate the Terms, BTC Advance will be entitled, at
                    any time, to bring an action or proceeding for specific
                    performance, injunctive relief or other equitable relief in
                    addition to (and not to the exclusion of or in substitution
                    for) any other remedies at law or in equity.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">Indemnification</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    You agree to indemnify and hold BTC Advance and its
                    affiliates, agents, officers, and employees from and against
                    any suit, action, claim, demand, penalty or loss, including
                    reasonable attorneys’ fees and expenses and any amount paid
                    in settlement to a third party, made by or resulting from
                    any third party (including any government agency or body)
                    due to, in connection with or arising out of (i) your use of
                    the Online Platform, the Content, or your BTC Advance
                    Account, (ii) any breach or alleged or claimed breach of the
                    Terms or the materials it incorporates by reference,
                    including the Privacy Policy, (iii) your violation of any
                    law, regulation, order or other legal mandate, or the rights
                    of a third party, or (iv) any act or omission by your agent,
                    representative or third-party service provider while using
                    your BTC Advance Account, regardless of whether the specific
                    use was expressly authorized by you.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Limitation of Liability
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    BTC Advance and its affiliates, agents, officers, and
                    employees will not be liable to you under any theory of
                    liability—whether based in contract, tort, negligence,
                    strict liability, warranty, or otherwise—for any indirect,
                    consequential, exemplary, incidental, punitive or special
                    damages or lost profits, even if BTC Advance has been
                    advised of the possibility of such damages. <br />
                    The total liability of BTC Advance for any claim arising out
                    of or relating to these Terms or our Services, regardless of
                    the form of the action, is limited to the amount paid, if
                    any, by you to access or use the Online Platform.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Your Use and Access Outside of the United States
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    We make no claims that the Online Platform or the Content
                    are appropriate for or may be downloaded or accessed outside
                    of the United States. If you access the Online Platform from
                    outside the United States, you do so at your own risk and
                    are responsible for compliance with the applicable laws of
                    the country or jurisdiction where you may be located. You
                    may not use or export any content of the Online Platform in
                    violation of U.S. export laws and regulations or any other
                    U.S. or foreign federal, state or local statute, rule or
                    regulation.
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    The Content is not intended for distribution to, or use by,
                    any person or entity in any jurisdiction or country where
                    such distribution or use would be contrary to local law or
                    regulation. BTC Advance makes no representations that the
                    Content is appropriate for use in all locations, or that the
                    transactions, products, loans, financial instruments or
                    services indicated or discussed on the Online Platform are
                    available or appropriate for sale or use in all
                    jurisdictions, or countries or by all investors or
                    counterparties.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Restricted Jurisdictions
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    You may not register a BTC Advance Account or use the Online
                    Platform if you are a resident of any jurisdiction in which
                    (i) BTC Advance is not authorized to provide the Services,
                    (ii) the United States has embargoed goods or services,
                    (iii) where your use of the Services would be illegal or
                    otherwise violate any applicable law of such jurisdiction or
                    of the United States (“Restricted Jurisdiction”).You hereby
                    represent and warrant that you are not a resident of any
                    Restricted Jurisdiction and that you will not register a BTC
                    Advance Account or use the Online Platform even if our
                    methods to prevent you from registering an account or using
                    the Online Platform are not effective or can be bypassed. We
                    may implement controls to restrict access to the Online
                    Platform from any Restricted Jurisdiction.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">Restricted Persons</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    You hereby represent and warrant that you have not been
                    identified as a Specially Designated National or placed on
                    any sanctions list by the U.S. Treasury Department’s Office
                    of Foreign Assets Control, the U.S. Commerce Department, or
                    the U.S. Department of State; and you will not use our
                    Online Platform to conduct any illegal or illicit activity.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Transfer and Processing of Data
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    By accessing or using our Online Platform, you consent to
                    the processing, transfer and storage of information about
                    you in and to the United States and other countries, where
                    you may not have the same rights and protections as you do
                    under local law.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">Fair Practices</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    You agree not to: (i) make any representations, warranties
                    or guarantees on BTC Advance’s behalf or with respect to the
                    Online Platform or any content or data contained on the
                    Online Platform; (ii) make any false or misleading
                    representations with regard to BTC Advance or the Online
                    Platform or any content or data contained on the Online
                    Platform; or (iii) participate or engage in any illegal,
                    deceptive, misleading, fraudulent, unethical or improper
                    practices on, through, by means of or with respect to the
                    Online Platform.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">Assignment</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    You acknowledge and agree that you may not assign, delegate,
                    sub-contract or otherwise transfer your rights or
                    obligations under the Terms. BTC Advance may transfer,
                    assign, delegate, sub-contract or otherwise transfer its
                    rights and obligations under the Terms without notifying you
                    or obtaining your consent.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Choice of Law; Forum for Disputes
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    The Terms and all disputes, claims or controversies (whether
                    in tort, contract or otherwise) arising out of or relating
                    in any way to the Terms, the Online Platform or the Content,
                    the negotiation, interpretation, validity or performance of
                    the Terms, the rights and obligations of you and us
                    hereunder or any transaction contemplated by the Online
                    Platform shall be governed by and construed in accordance
                    with the laws of the State of New Jersey without regard to
                    the rules or principles of conflict of laws of such State or
                    any other jurisdiction that would permit or require the
                    application of the laws of any other jurisdiction. We and
                    you each hereby irrevocably and unconditionally consent to
                    submit to the sole and exclusive jurisdiction of the courts
                    of the State of New Jersey and of the United States of
                    America located in the State of New Jersey, City of Jersey
                    City (the “New Jersey Courts”) for any litigation, lawsuit
                    or proceeding between you and us arising out of or relating
                    in any way to the Terms
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    (including any non-contractual claims), the Online Platform
                    or the Content, the negotiation, interpretation, validity or
                    performance of the Terms, the rights and obligations of you
                    and us hereunder or any transaction contemplated by the
                    Online Platform. <br />
                    You and we each waive any objection to the laying of venue
                    of any such litigation in the New Jersey Courts and agree
                    not to plead or claim in any New Jersey Court that such
                    litigation brought therein has been brought in an
                    inconvenient forum or that there are indispensable parties
                    to such litigation that are not subject to the jurisdiction
                    of the New Jersey Courts. You and we each hereby irrevocably
                    waive any and all rights which you or we, respectively, may
                    have, or may have had, to bring such litigation in or before
                    any other court or tribunal (whether domestic or foreign),
                    or before any similar domestic or foreign authority or body,
                    and agree not to claim or plead any such rights.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">WAIVER OF JURY TRIAL</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    WE AND YOU EACH HEREBY IRREVOCABLY AND UNCONDITIONALLY WAIVE
                    ANY RIGHT WE OR YOU, RESPECTIVELY, MAY HAVE TO A JURY TRIAL
                    IN RESPECT OF ANY LEGAL ACTION OR PROCEEDING ARISING OUT OF
                    OR RELATING TO THESE TERMS OF SERVICE OR THE ONLINE PLATFORM
                    AND ANY COUNTERCLAIM THEREIN. EACH PARTY CERTIFIES AND
                    ACKNOWLEDGES THAT SUCH PARTY HAS CONSIDERED THE IMPLICATIONS
                    OF THIS WAIVER AND MAKES THIS WAIVER VOLUNTARILY.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">Class Action Waiver</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    YOU AND WE AGREE THAT THERE WILL BE NO RIGHT OR AUTHORITY
                    FOR ANY DISPUTE TO BE BROUGHT, HEARD, OR ARBITRATED AS A
                    CLASS ACTION (INCLUDING WITHOUT LIMITATION OPT OUT CLASS
                    ACTIONS OR OPT IN COLLECTIVE CLASS ACTIONS), OR IN A
                    REPRESENTATIVE OR PRIVATE ATTORNEY GENERAL CAPACITY ON
                    BEHALF OF A CLASS OF PERSONS OR THE GENERAL PUBLIC. ALL
                    DISPUTES SHALL BE RESOLVED ON AN INDIVIDUAL BASIS ONLY.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">General</span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    All rights in the Online Platform not otherwise expressly
                    granted to you by the Terms are reserved to BTC Advance. The
                    Terms, together with the Privacy Policy, constitute the sole
                    and entire agreement between you and us with respect to the
                    subject matter hereof and supersedes all other prior or
                    contemporaneous negotiations, discussions, agreements,
                    understandings, representations and warranties, both written
                    and oral, between you and us with respect to such subject
                    matter. You agree that no joint venture, partnership,
                    employment, or agency relationship exists between you and
                    BTC Advance as a result of the Terms or any use of the
                    Online Platform. The failure of BTC Advance to exercise or
                    enforce any right or provision of the Terms shall not
                    constitute a waiver of such right or provision.
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    If any provision of the Terms is found by a court of
                    competent jurisdiction to be invalid, void, unlawful or
                    unenforceable, the Parties agree that the court should give
                    effect to the Parties’ intentions as reflected in such
                    provision, and the other provisions of the Terms shall
                    remain in full force and effect. The section titles in the
                    Terms are for convenience only and have no legal or
                    contractual effect. Neither the course of conduct between
                    you and BTC Advance, nor trade practice, shall act to modify
                    any provision of the Terms. For purposes of the Terms, the
                    terms include, includes, including, such as and for example,
                    shall be construed as if each term were followed by the
                    words, without limitation. Except where context requires
                    otherwise, use of the singular form of any noun includes the
                    plural, and use of the plural includes the singular.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Anti-money laundering and sanctions
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    Notwithstanding any other provision of the Agreement to the
                    contrary, we are not obliged to do or omit to do anything if
                    it would, or might in its reasonable opinion, constitute a
                    breach of any AML/CTF Requirements. You must provide to us
                    upon request all information and documents that are within
                    your possession, custody or control reasonably required by
                    us from time to time, and as necessary in order for us to
                    comply with any applicable AML/CTF Requirements. You agree
                    that we may disclose any information concerning you to any
                    Government Agency, law enforcement entity, regulatory agency
                    or court (in any jurisdiction) where required by any
                    Applicable Law.{" "}
                  </p>
                </div>
                <div className="terms-block__side">
                  <p className="terms-block__desc">
                    You agree to exercise your rights and perform your
                    obligations under the Agreement in accordance with all
                    applicable AML/CTF Requirements. You agree to provide
                    evidence of due authority and specimen signatures for each
                    Authorized Person. You agree that we may take a sufficient
                    time to consider, verify or block an Order, if you or any
                    other person or entity in connection with the Order becomes
                    a sanctioned person or entity, or upon the occurrence of a
                    match on our sanction filters.
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-block">
              <div className="terms-block__left">
                <span className="terms-block__title">
                  Questions or Comments; Our Contact Information
                </span>
              </div>
              <div className="terms-block__main">
                <div className="terms-block__side">
                  <p className="terms-desc terms-desc--big">
                    If there are any questions regarding our Terms of Service,
                    you may contact us using the following information: <br />
                    <br />
                    1309 COFFEEN AVENUE STE 1200, SHERIDAN, WYOMING, 82801{" "}
                    <a
                      href="mailto:support@Crypto.Exchange"
                      className="terms-desc terms-desc--big link link--green link--inline link--underline"
                    >
                     info@Crypto.Exchange
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <p className="terms-desc">
          <br />
          <br />
          Terms Last Modified: 10/1/2021
        </p>
          </div>
          
        </div>
       
      </div>
    </div>
  );
};
export default TermsOfService;
