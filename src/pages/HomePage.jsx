import { Link } from "react-router-dom";

export function HomePage() {
    return (
        <section>
            <h1>Home sweet Home</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt ea omnis blanditiis
                deleniti impedit illo ullam, magnam aut minus veritatis corporis quos iure fugiat repellat assumenda
                fugit mollitia illum! Delectus velit fugit dolores maiores quam laudantium minima similique sapiente
                minus deserunt vel cum tenetur molestias commodi eos distinctio, consequatur ducimus dolorum odio
                itaque natus soluta fuga! Deserunt in hic harum magnam quos. Expedita, quis corrupti quia esse excepturi
                alias aperiam repudiandae soluta animi modi temporibus veniam vero eveniet nemo ipsa?
            </p>
            <Link to='/car' >Check Our Cars!</Link>
        </section >
    )
}

