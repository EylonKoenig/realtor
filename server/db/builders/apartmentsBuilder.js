class CustomersBuilder {
    constructor(page, size) {
        this.query = 'SELECT ap.* ,ap.id,c.name `city_name`,countries.`name` country,group_concat(images.url) images,concat(u.first_name,u.last_name) onwer,u.email\
                            FROM apartments ap join cities c ON ap.city_id = c.id\
                            JOIN countries  ON c.country_id = countries.id \
                            JOIN images ON ap.id = images.apartment_id\
                            JOIN users u ON ap.user_id = u.id\
                            WHERE 1 ';
        this.params = [];
        this.page = page;
        this.size = size;
    }
    apartmentId(aparId) {
        if (aparId) {
            this.params.push(aparId)
            this.query += 'AND ap.id = ?'
        }
        return this;
    }
    property_type(property) {
        if (property) {
            this.params.push(property)
            this.query += 'AND property = ap.address'
        }
        return this;
    }
    city(cityId) {
        if (cityId) {
            this.params.push(cityId)
            this.query += 'AND city_id = ?'
        }
        return this;
    }
    country(countryId) {
        if (countryId) {
            this.params.push(countryId)
            this.query += 'AND countries.id = ?'
        }
        return this;
    }
    minPrice(minimumPrice) {
        if (minimumPrice) {
            this.params.push(minimumPrice)
            this.query += 'AND ap.price > ?'
        }
        return this;
    }
    maxPrice(maximumPrice) {
        if (maximumPrice) {
            this.params.push(maximumPrice)
            this.query += 'AND ap.price < ?'
        }
        return this;
    }
    minRoom(minimumRoom) {
        if (minimumRoom) {
            this.params.push(minimumRoom)
            this.query += 'AND number_of_room < ?'
        }
        return this;
    }
    maxRoom(maximumRoom) {
        if (maximumRoom) {
            this.params.push(maximumRoom)
            this.query += 'AND number_of_room > ?'
        }
        return this;
    }
    minBath(minimumBath) {
        if (minimumBath) {
            this.params.push(minimumBath)
            this.query += 'AND number_of_bath < ?'
        }
        return this;
    }
    maxBath(maximumBath) {
        if (maximumBath) {
            this.params.push(maximumBath)
            this.query += 'AND number_of_bath > ?'
        }
        return this;
    }
    sale_status(sale_status) {
        if (sale_status) {
            this.params.push(sale_status)
            this.query += 'AND sale_status = ?'
        }
        return this;
    }
    build() {
        this.query += `GROUP BY ap.id\
                       LIMIT ${(this.page-1)*this.size}, ${this.size};`
        return { query: this.query, params: this.params };
    }

}
class Builder {
    static allApartments(page, size) {
        return new CustomersBuilder(page, size);
    }
}

module.exports = Builder;