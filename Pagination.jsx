<Pagination
              showSizeChanger
              defaultPageSize={10}
              defaultCurrent={this.state.current}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onChangePage}
              total={this.state.totalCount}
              locale={localeInfo}
            />
