<?php

add_shortcode('map_editor' , 'map_editor_design');

function map_editor_design(){ ?>
<section className="rolling_image remove_image">
<p>Please Wait! Uploading parsing data...</p>
</section>

    <section className="load">
        <p>Loading Wielrennen Poster</p>
    </section>
    <!-- <section className="load"></section> -->
    <section className="unsupported">
        <div>
        <h1>Sorry, de editor is alleen beschikbaar op een computer. Laat hieronder je e-mailadres achter zodat we je hiervan op de hoogte stellen.</h1>
        <?php 
        echo do_shortcode('[contact-form-7 id="6809" title="No Map Working"]');
        ?>
        </div>
    </section>
    <div className="wrapper custom-fixed-height">
        <aside className="option">
            <section className="stage activity" data-view-source="activity">
                <div className="scroll">
                    <section className="step intro" data-view-source="intro">
                        <header>
                            <div className="title">
                                <h2>ACTIVITEIT(EN) TOEVOEGEN</h2>
                            </div>
                        </header>
                        <div className="content">
                            <div className="transfer">
                                <div className="item strava">
                                    <div className="connect">
                                        <a className="button large" data-action-target="activity_strava_authorize">VERBINDING MAKEN MET</a>
                                        <h6>Maak een verbinding met jouw Strava account en voeg je activiteit(en) toe</h6>
                                    </div>
                                    <div className="search">
                                        <a className="button large" data-action-target="activity_strava_explore">Zoeken</a>
                                        <h6>Ontdek je Strava-activiteiten</h6>
                                    </div>
                                </div>
                                <div className="item upload">
                                    <a className="button large tertiary">
                                        <input type="file" accept=".gpx" multiple="">
                                        UPLOAD EEN GPX-ACTIVITEIT
                                    </a>
                                    <h6>Zit je niet op Strava? Upload dan hier een GPX-bestand</h6>
                                </div>
                            </div>
                            <div className="question faqs-question">
                                <h3>VEELGESTELDE VRAGEN</h3>
                                <div className="item">
                                    <p>Weet je niet precies wat een GPX-bestand is of hoe je hieraan komt? Lees onze handige gids zodat je jouw poster kan ontwerpen</p>
                                </div>
                                <div className="item">
                                    <p>Wil je een kaart maken voor iemand anders? Lees onze gids over het ophalen of het maken van een activiteit</p>
                                </div>
                                <div className="item">
                                    <p>Heb je je rit niet geregistreerd? Maak de rit aan met behulp van een tool zoals <a href="https://plotaroute.com" target="_blank">plotaroute.com</a> en download het GPX-bestand</p>
                                </div>
                                <div className="item">
                                    <p>Overige vragen? Neem <a href="<?php echo site_url(); ?>/contact-us">contact met ons op</a> en we beantwoorden je vraag zo snel mogelijk!</p>
                                </div>
                            </div>
                        </div>
                        <footer></footer>
                    </section>
                    <section className="step strava" data-view-source="strava">
                        <header>
                            <div className="title">
                                <a className="previous apply-btn" data-view-target="activity:intro"></a>
                                <h2>JOUW STRAVA ACTIVITEITEN</h2>
                            </div>
                        </header>
                        <div className="content">
                            <div className="field search">
                                <input type="text" id="search" name="search" placeholder="Zoek naar een Strava activiteit...">
                            </div>
                            <section className="list">
                                <div className="item clone">
                                    <div className="detail">
                                        <h4></h4>
                                        <div className="metadata">
                                            <span className="time"></span>
                                            <span className="distance"></span>
                                            <span className="duration"></span>
                                        </div>
                                    </div>
                                    <a className="toggle" data-action-target="activity_strava_toggle"></a>
                                </div>
                            </section>
                        </div>
                        <footer>
                            <aside className="note info">
                                <h4>Kun je je activiteit niet vinden?</h4>
                                <p>Helaas beperkt Strava het aantal ritten dat we uit hun database kunnen halen. Probeer het dan met de  <a data-view-target="activity:intro">GPX upload</a> mogelijkheid.</p>
                            </aside>
                            <div className="action">
                                <a className="button large primary design first_screen_btn" data-view-target="design">VOLGENDE STAP: Design</a>
                            </div>
                        </footer>
                    </section>
                    <section className="step inventory" data-view-source="inventory">
                        <header>
                            <div className="title">
                                <h2>Geïmporteerde ritten</h2>
                            </div>
                        </header>
                        <div className="content">
                            <section className="list position">
                                <div className="item clone">
                                    <div className="picture"></div>
                                    <div className="detail">
                                        <h4></h4>
                                        <div className="metadata">
                                            <span className="time"></span>
                                            <span className="distance"></span>
                                            <span className="duration"></span>
                                        </div>
                                    </div>
                                    <a className="delete"></a>
                                </div>
                            </section>
                            <div className="transfer">
                                <div className="item strava">
                                    <div className="connect">
                                        <a className="button large" data-action-target="activity_strava_authorize">VERBINDING MAKEN MET</a>
                                        <h6>
                                            Maak een verbinding met jouw Strava account en voeg je activiteit(en) toe
                                        </h6>
                                    </div>
                                    <div className="search">
                                        <a className="button large" data-action-target="activity_strava_explore">Search</a>
                                        <h6>Ontdek je Strava-activiteiten</h6>
                                    </div>
                                </div>
                                <div className="item upload">
                                    <a className="button large tertiary">
                                        <input type="file" accept=".gpx" multiple="">
                                        GPX-activiteiten uploaden
                                    </a>
                                    <h6>Zit je niet op Strava? Upload dan hier een GPX-bestand</h6>
                                </div>
                            </div>
                        </div>
                        <footer>
                            <div className="action">
                                <a className="button large primary design second_btn" data-view-target="design">VOLGENDE STAP: Design</a>
                            </div>
                        </footer>
                    </section>
                </div>
            </section>
            <section className="stage design" data-view-source="design">
                <div className="scroll">
                    <section className="step design display">
                        <header>
                            <div className="title">
                              <!--   <a className="previous apply-btn" data-view-target="activity:inventory"></a> -->
                                <a className="previous apply-btn all-btn-behv"></a>
                                <h2>ONTWERP JOUW KAART</h2>
                            </div>
                            <a>Bekijk onze instructie video</a>
                        </header>
                        <div className="content">
                            <!-- Icons group -->
                            <div className="group icons-list">
                                <div className="toggle-icons">
                                        <a className="item color-scheme" data-id="item1">
                                            <div>
                                                <div className="picture"></div>  
                                                <h6>Kleurenschema</h6>
                                            </div>
                                        </a>
                                        <a className="item layout" data-id="item2">
                                            <div>
                                                <div className="picture"></div>
                                                <h6>Layout</h6>
                                            </div>
                                        </a>
                                        <a className="item overlay" data-id="item3">
                                            <div>
                                                <div className="picture"></div>
                                                <h6>Verloop</h6>
                                            </div>
                                        </a>
                                        <a className="item titles" data-id="item4">
                                            <div>
                                                <div className="picture"></div>
                                                <h6>Titels</h6>
                                            </div>
                                        </a>
                                        <a className="item map-marker" data-id="item5">
                                            <div>
                                                <div className="picture"></div>
                                                <h6>Kaartmarkering</h6>
                                            </div>
                                        </a>
                                        <a className="item line-thikness" data-id="item6">
                                            <div>
                                                <div className="picture"></div>
                                                <h6>Lijndikte</h6>
                                            </div>
                                        </a>
                                        <a className="item font-style" data-id="item7">
                                            <div>
                                                <div className="picture"></div>
                                                <h6>Lettertype</h6>
                                            </div>
                                        </a>
                                        <a className="item elevation" data-id="item8">
                                            <div>
                                                <div className="picture"></div>
                                                <h6>Hoogteprofiel</h6>
                                            </div>
                                        </a>
                                        <a className="item activity" data-id="item9">
                                            <div>
                                                <div className="picture"></div>
                                                <h6>Activiteit</h6>
                                            </div>
                                        </a>
                                        
                                </div>
                            </div>

                            <!-- style -->
                            <div className="show-group-lists">
                                <!-- Style -->
                                <div className="group style" data-id="item1">
                                    <h3>Kleurenschema</h3>
                                    <div className="scheme" data-design-key="poster_style">
                                        <a className="item grey_light" data-design-value="grey_light">
                                            <div className="picture"></div>
                                            <h6>Lichtgrijs</h6>
                                        </a>
                                        <a className="item orange" data-design-value="orange">
                                            <div className="picture"></div>
                                            <h6>Oranje</h6>
                                        </a>
                                        <a className="item grey_dark" data-design-value="grey_dark">
                                            <div className="picture"></div>
                                            <h6>Donkergrijs</h6>
                                        </a>
                                        <a className="item blue" data-design-value="blue">
                                            <div className="picture"></div>
                                            <h6>Blauw</h6>
                                        </a>
                                        <a className="item outdoor" data-design-value="outdoor">
                                            <div className="picture"></div>
                                            <h6>Buiten</h6>
                                        </a>
                                        <a className="item pastel" data-design-value="pastel">
                                            <div className="picture"></div>
                                            <h6>Pastel</h6>
                                        </a>
                                        <a className="item spring" data-design-value="spring">
                                            <div className="picture"></div>
                                            <h6>Lente</h6>
                                        </a>
                                        <a className="item black_white" data-design-value="black_white">
                                            <div className="picture"></div>
                                            <h6> Zwart & Wit</h6>
                                        </a>
                                    </div>
                                  
                                </div>

                                <!-- orientation -->
                                <div className="group orientation" data-id="item2">
                                    <h3>Layout</h3>
                                    <div className="block" data-design-key="paper_orientation">
                                        <a className="item portrait" data-design-value="portrait">
                                            <div>
                                                <div className="icon"></div>
                                                <h6>Verticaal</h6>
                                            </div>
                                        </a>
                                        <a className="item landscape" data-design-value="landscape">
                                            <div>
                                                <div className="icon"></div>
                                                <h6>Horizontaal</h6>
                                            </div>
                                        </a>
                                    </div>
                                     <div className="group material materials" data-id="item2">
                                        <h3>Materialen</h3>
                                        <div className="block" data-design-key="paper_material">
                                            <a className="item canvas" data-design-value="canvas">
                                                <div className="inner-item">
                                                    <h6>Canvas</h6>
                                                </div>
                                            </a>
                                            <a className="item aluminium" data-design-value="aluminium">
                                                <div className="inner-item">
                                                    <h6>Aluminium</h6>
                                                </div>
                                            </a>
                                            <a className="item glass" data-design-value="glass">
                                                <div className="inner-item">
                                                    <h6>Glass</h6>
                                                </div>
                                            </a>                                            
                                        </div>
                                    </div>
                                    <div className="group size custom-design" data-id="item2">
                                        <h3>Afmeting</h3>  
                                        <div className="block" data-design-key="paper_size">
                                            <!-- <a className="item" data-design-value="a3">
                                                <div className="inner-item">
                                                    <h6>A3</h6>
                                                    <div className="metadata">
                                                        <span>21 x 29.7 cm</span>
                                                        <span>11.7 x 16.5 in</span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="item" data-design-value="a2">
                                                <div className="inner-item">
                                                    <h6>A2</h6>
                                                    <div className="metadata">
                                                        <span>42 x 59.4 cm</span>
                                                        <span>16.5 x 23.4 in</span>
                                                    </div>
                                                </div>
                                            </a> -->
                                             <a className="item size20" data-design-value="20x30">
                                                <div className="inner-item">
                                                    <span>20x30 cm</span>
                                                </div>
                                            </a>
                                            <a className="item size30" data-design-value="30x40">
                                                <div className="inner-item">
                                                    <span>30x40 cm</span>
                                                </div>
                                            </a>
                                            <a className="item size50" data-design-value="50x70">
                                                <div className="inner-item">
                                                    <span>50x70 cm</span>
                                                </div>
                                            </a>
                                            <a className="item size60" data-design-value="60x90">
                                                <div className="inner-item">
                                                    <span>60x90 cm</span>
                                                </div>
                                            </a>
                                            <a className="item size70" data-design-value="70x100">
                                                <div className="inner-item">
                                                    <span>70x100 cm</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>                                   
                                  
                                    <!-- outline -->
                                    <div className="group outline" data-id="item2">
                                        <h3>Vorm</h3>
                                        <div className="block" data-design-key="outline_type">
                                            <a className="item classic" data-design-value="classic">
                                                <div className="inner-item">
                                                    <div className="icon"></div>
                                                    <h6>Klassiek</h6>
                                                </div>
                                            </a>
                                            <a className="item circle" data-design-value="circle">
                                                <div className="inner-item">
                                                    <div className="icon"></div>
                                                    <h6>Cirkel</h6>
                                                </div>
                                            </a>
                                            <a className="item square" data-design-value="square">
                                                <div className="inner-item">
                                                    <div className="icon"></div>
                                                    <h6>Vierkant</h6>
                                                </div>
                                            </a>
                                            <a className="item none" data-design-value="none">
                                                <div className="inner-item">
                                                    <div className="icon"></div>
                                                    <!-- <h6>None</h6> -->
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                <!-- overlay -->
                                <div className="group overlay" data-id="item3">
                                    <h3>Verloop</h3>
                                    <div className="block" data-design-key="overlay_type">
                                        <a className="item radial" data-design-value="radial">
                                            <div>
                                                <div className="icon"></div>
                                                <h6>Radiaal</h6>
                                            </div>
                                        </a>
                                        <a className="item linear" data-design-value="linear">
                                            <div>
                                                <div className="icon"></div>
                                                <h6>Verticaal</h6>
                                            </div>
                                        </a>
                                        <a className="item none" data-design-value="nonelay">
                                            <div>
                                                <div className="icon"></div>
                                                <!-- <h6>None</h6> -->
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <!-- text -->
                                <div className="group text" data-id="item4">
                                    <h3>Titels</h3>
                                    <div className="form" data-design-key="text">
                                        <div className="field text">
                                            <input type="text" id="text[headline]" name="text[headline]" placeholder="Kop toevoegen">
                                        </div>
                                        <div className="field text">
                                            <input type="text" id="text[subtitle]" name="text[subtitle]" placeholder="Ondertitel toevoegen">
                                        </div>
                                        <div className="field text">
                                            <input type="text" id="text[footnote]" name="text[footnote]" placeholder="Voetnoot toevoegen">
                                        </div>
                                        <div className="field text">
                                            <input type="text" id="text[metadata]" name="text[metadata]" placeholder="Activiteitsgegevens toevoegen">
                                            <div className="note">
                                                <strong>De bovenstaande activiteitsgegevens zijn bewerkbaar.</strong> Let op dat de geïmporteerde data niet altijd correct is. Check dit goed!
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- label -->
                                <div className="group label" data-id="item5">
                                    <h3>Kaartmarkering</h3>
                                    <p>
                                        Klik op de kaart om een markering toe te voegen<br>
                                        <a href="">Bekijk onze video om te kijken hoe dit werkt</a>    
                                    </p>
                                    <div className="item clone">
                                        <div className="field text" data-design-key="label_text">
                                            <input type="text" id="" name="" value="" placeholder="Label">
                                        </div>
                                        <div className="block" data-design-key="label_anchor">
                                            <a className="item anchor_left" data-design-value="left">
                                                <div>
                                                    <div className="icon"></div>
                                                    <h6>Stip links</h6>
                                                </div>
                                            </a>
                                            <a className="item anchor_bottom" data-design-value="bottom">
                                                <div>
                                                    <div className="icon"></div>
                                                    <h6>Midden</h6>
                                                </div>
                                            </a>
                                            <a className="item anchor_right" data-design-value="right">
                                                <div>
                                                    <div className="icon"></div>
                                                    <h6>Stip rechts</h6>
                                                </div>
                                            </a>
                                            <a className="item delete" data-design-value="delete">
                                                <div>
                                                    <div className="icon"></div>
                                                    <h6>Verwijder</h6>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <!-- line width -->
                                <div className="group line_width" data-id="item6">
                                    <h3>Lijndikte</h3>
                                    <div className="block" data-design-key="activity_line_width">
                                        <a className="item width_1" data-design-value="1"></a>
                                        <a className="item width_2" data-design-value="2"></a>
                                        <a className="item width_3" data-design-value="3"></a>
                                        <a className="item width_4" data-design-value="4"></a>
                                        <a className="item width_5" data-design-value="5"></a>
                                    </div>
                                </div>

                                <!-- font family -->
                                <div className="group font_family" data-id="item7">
                                    <h3>Lettertype</h3>
                                    <div className="form-group font-family" data-design-key="font_family">
                                        <div className="custom-select">
                                            <select className="form-control">
                                                <option>Lettertype</option>
                                                <option data-design-value="circular">Circular</option>
                                                <option data-design-value="effra">Effra</option>
                                                <option data-design-value="source">Source Sans</option>
                                                <option data-design-value="montserrat">Montserrat</option>
                                                <option data-design-value="roboto">Roboto Slab</option>
                                                <option data-design-value="literata">Literata</option>
                                                <option data-design-value="playfair">Playfair</option>
                                                <option data-design-value="redrose">Red Rose</option>
                                            </select>
                                        </div>
                                    </div>
                                    <!-- font size -->
                                    <div className="group font_size" data-id="item7">
                                        <h3>Grootte van het lettertype</h3>
                                        <div className="inline" data-design-key="font_size">
                                            <a className="item" data-design-value="small">S</a>
                                            <a className="item" data-design-value="medium">M</a>
                                            <a className="item" data-design-value="large">L</a>
                                            <a className="item" data-design-value="extra">XL</a>
                                        </div>
                                    </div>
                                </div>

                                

                                <!-- elevation profile -->
                                <div className="group elevation_enable" data-id="item8">
                                    <h3>Hoogteprofiel</h3>
                                    <div className="inline" data-design-key="elevation_enable">
                                        <a className="item" data-design-value="true">Ja</a>
                                        <a className="item" data-design-value="false">Nee</a>
                                    </div>
                                    <p>
                                       Zorg dat je de activiteiten in de goede volgorde hebt staan<br>
                                        <a data-view-target="activity:inventory">Klik hier om de volgorde van de activiteiten aan te passen</a>
                                    </p>
                                    <div className="group elevation_multiply" data-id="item8">
                                        <h3>Hoogte van het profiel</h3>
                                        <div className="block" data-design-key="elevation_multiply">
                                            <a className="item small" data-design-value="small">
                                                <div>
                                                    <div className="icon"></div>
                                                    <h6>Laag</h6>
                                                </div>
                                            </a>
                                            <a className="item medium" data-design-value="medium">
                                                <div>
                                                    <div className="icon"></div>
                                                    <h6>Gemiddeld</h6>
                                                </div>
                                            </a>
                                            <a className="item large" data-design-value="large">
                                                <div>
                                                    <div className="icon"></div>
                                                    <h6>Hoog</h6>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                

                                <!-- point finish -->
                                <div className="group point_finish" data-id="item9">
                                    <h3>Eindpunten activiteit tonen ?</h3>
                                    <div className="block" data-design-key="activity_point_finish">
                                        <a className="item positive" data-design-value="true">
                                            <div>
                                                <div className="icon"></div>
                                                <h6>Ja</h6>
                                            </div>
                                        </a>
                                        <a className="item negative" data-design-value="false">
                                            <div>
                                                <div className="icon"></div>
                                                <h6>Nee</h6>
                                            </div>
                                        </a>
                                    </div>
                                    <!-- point track -->
                                    <div className="group point_activity" data-id="item9">
                                        <h3>Start & Stoppunt activiteit tonen ?</h3>
                                        <div className="block" data-design-key="activity_point_activity">
                                            <a className="item positive" data-design-value="true">
                                                <div>
                                                    <div className="icon"></div>
                                                    <h6>Ja</h6>
                                                </div>
                                            </a>
                                            <a className="item negative" data-design-value="false">
                                                <div>
                                                    <div className="icon"></div>
                                                    <h6>Nee</h6>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                                <!-- Bottom button -->
                                <div className="bottom-button">
                                   <a className="apply-btn button small"> Toepassen</a>
                                   <!-- <a className="cancel-btn button small"> Annuleren</a> -->
                                </div>
                            </div>

                        </div>
                        <footer>
                            <div className="prompt display">Scroll naar beneden voor meer opties</div>
                            <div className="inline">
                                <div className="order">
                                    <span className="size">A3</span>
                                    <span className="price">00.00</span>
                                    <span className="shipping">Inclusief GRATIS verzending</span>
                                </div>
                                <div className="action">
                                    <a className="button large tertiary editor" data-action-target="option_toggle">Editor</a>
                                    <a className="button large primary review" data-view-target="review" id="downloadLink">PREVIEW</a>
                                    <!-- <a className="button large primary " id="downloadLink">Print</a> -->
                                   
                                </div>
                            </div>
                        </footer>
                    </section>
                </div>
            </section>
            <section className="stage review" data-view-source="review">
                <div className="scroll">
                    <section className="step review display">
                        <header>
                            <div className="title">
                                <a className="previous apply-btn" data-action-target="review_modify"></a>
                                <h2>PREVIEW & GOEDKEUREN</h2>
                            </div>
                        </header>
                        <div className="content">
                            <aside className="note info">
                                <h4>Check jouw design</h4>
                                <p>We nemen geen verantwoordelijkheid voor onjuist ingevoerde informatie. Vanwege onze snelle doorlooptijd kunnen we het ontwerp na bestelling niet meer wijzigen</p>
                            </aside>
                            <ul>
                                <li><span className="emoji">📦</span> Free worldwide shipping on prints</li>
                                <li><span className="emoji">🚴‍♂️</span> Delivered in 3–7 days on average</li>
                                <li><span className="emoji">🌱</span> 1 tree planted for every order</li>
                                <li><span className="emoji">⭐️</span> Average rating 4.92</li>
                                <li><span className="emoji">💯</span> 100% money back guarantee</li>
                            </ul>
                            <div className="get-in-touch-bottom text text-center">
                                <h2>VRAGEN?</h2>
                                <div className="svg-container">
                                    
                                </div>
                                <a className="button large tertiary mt-3 custom-outline-button" href="<?php echo site_url(); ?>/contact-us" target="_blank">NEEM CONTACT OP</a> </p>
                            </div>
                        </div>
                        <footer>
                            <div className="field toggle">
                                <input type="checkbox" id="confirm" name="confirm">
                                <label for="confirm">Ik heb het ontwerp goedgekeurd</label>
                            </div>
                            <div className="action">
                                <a className="button large tertiary edit" data-action-target="review_modify">BEWERKEN</a>
                                <a className="button large primary checkout disabled add-to-cart-d">AFREKENEN</a>
                            </div>
                        </footer>
                    </section>
                </div>
            </section>
        </aside>
        <main>

            <!-- preview -->
            <section className="preview" id="preview_content">
                <section className="poster">
                    <span className="width sizes">21 CM or 11.7 IN</span>
                    <span className="height sizes">29.7 CM or 16.5 IN </span>
                    <section className="layer map">

                        <!-- basemap -->
                        <!-- iframe -->
                        <iframe className="basemap" src="https://mapeditor.arhamsoft.info/basemap/?_=<?php echo rand(); ?>" frameborder="0" id="my_map_box"></iframe>

                    </section>
                    <section className="layer overlay"></section>
                    <section className="layer activity">

                        <!-- point -->
                        <div className="point clone"></div>

                        <!-- basemap -->
                        <!-- iframe -->
                        <iframe className="basemap" src="https://mapeditor.arhamsoft.info/basemap/?_=<?php echo rand(); ?>" frameborder="0"></iframe>

                    </section>
                    <section className="layer label">

                        <!-- marker -->
                        <div className="marker clone">
                            <div className="label">
                                <div className="anchor"></div>
                                <div className="text"></div>
                            </div>
                        </div>

                        <!-- basemap -->
                        <!-- iframe -->
                        <iframe className="basemap" src="https://mapeditor.arhamsoft.info/basemap/?_=<?php echo rand(); ?>" frameborder="0"></iframe>

                    </section>
                    <section className="layer outline"></section>
                    <section className="layer elevation"></section>
                    <section className="layer text" id="layer_text">
                        <div className="headline"></div>
                        <div className="subtitle"></div>
                        <div className="footnote"></div>
                        <div className="metadata"></div>
                    </section>
                </section>
            </section>

            <!-- control -->
            <section className="control">
                <a className="pill center" data-action-target="activity_bound"></a>
                <a className="pill scale" data-action-target="poster_scale_toggle"></a>
                <div className="zoom">
                    <a className="positive" data-zoom-action="positive"></a>
                    <a className="negative" data-zoom-action="negative"></a>
                </div>
            </section>

            <!-- credit -->
            <!-- <section className="credit"></section> -->
        </main>
    </div>
    <aside className="alert">
        <div className="item clone">
            <h6></h6>
            <p></p>
        </div>
    </aside>




<?php }