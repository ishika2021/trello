type ButtonProps = {
    label: string;
    action: ()=>void | void  ;
    style?: string;
}

const Button = ({label,action,style="primary"}:ButtonProps) => {
    return(
        <button className={`btn ${style}`} onClick={action}>
            {label}
        </button>
    )
}

export default Button;