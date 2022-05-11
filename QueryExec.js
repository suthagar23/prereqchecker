class QueryExec {
    async exec(conn, query, previous) {
        try {
            const sql = query.getSql(previous)
            const values = query.getValues && query.getValues(previous)
            console.log(query.name, sql, values)

            const response = await new Promise((resolve, reject) => {
                if (process.env.DB_DISABLED === '1') {
                    resolve(query.fakeResults)
                } else {
                    conn.query(sql, values, (err, results) => {
                        if (err) {
                            console.log(query.step + query.name + ' query error ' + err.message);
                            reject(err)
                        } else {
                            console.log(query.step + query.name + ' query success')
                            resolve(results);
                        }
                    })
                }
            });
            // console.log(response);
            return response
        } catch (error) {
            console.log(query.step + query.name + ' catch ' + error);
        }
    }
}

module.exports = QueryExec;