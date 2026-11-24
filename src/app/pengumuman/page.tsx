import building from "../Assets/gedung.jpg";

function getToday(): string {
    return new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function Announcement() {
    return (
        <div className="min-h-screen text-foreground font-serif">
            <div className="grid grid-cols-1 font-serif p-8">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-3 pt-3 pl-2">
                        {getToday()}
                    </div>

                    <div className="col-span-12 md:col-span-6">
                        <h1 className="font-medium text-4xl text-center px-16">
                            The Tarumanagara Times
                        </h1>
                    </div>

                    <div className="col-span-12 md:col-span-3"></div>
                </div>
                <div className="my-6 grid gap-2">
                    <hr className="border-t-2 border-foreground" />
                    <hr className="border-t-2 border-foreground" />
                </div>

                <section className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-6 md:border-r-2 md:border-foreground md:pr-6">
                        <img
                            src={building.src}
                            alt=""
                        />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <article className="my-3">Title 1
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. 
                            Quisque faucibus ex sapien vitae pellentesque sem placerat. 
                            In id cursus mi pretium tellus duis convallis. 
                        </p>
                    </article>
                    <article className="my-3"> Title 2
                        <p>
                            Tempus leo eu aenean sed diam urna tempor. 
                            Pulvinar vivamus fringilla lacus nec metus bibendum egestas. 
                            Iaculis massa nisl malesuada lacinia integer nunc posuere.
                        </p>
                    </article>
                    <article className="my-3"> Title 3
                        <p>
                            Proin ullamcorper mauris eget sapien viverra, ut facilisis elit laoreet. 
                            Phasellus congue neque quis est mollis, vitae egestas justo auctor. 
                            Nam scelerisque risus in dignissim congue.
                        </p>
                    </article>
                    <article className="my-3"> Title 4
                        <p>
                            Nulla ipsum metus, eleifend sit amet eros in, iaculis iaculis arcu. 
                            Aenean bibendum auctor leo eu vehicula. 
                            Ut varius enim eget ligula tincidunt, quis facilisis metus condimentum.
                        </p>
                    </article>
                    </div>
                </section>
        </div>
    </div>
    );
}