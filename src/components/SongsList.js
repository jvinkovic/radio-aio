const SongsList = ({name, url}) => {
    return (
        <div>
            <h4>{name}</h4>            
            <iframe title={name} 
                    width='95%'     
                    height='500px' 
                    src={url} />
        </div>);
}

export default SongsList;